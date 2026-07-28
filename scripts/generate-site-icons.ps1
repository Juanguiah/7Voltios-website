Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$repoRoot = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $repoRoot "img\logo-maestro.png"
$outputDirectory = Join-Path $repoRoot "img"

function New-RoundedRectanglePath {
    param(
        [System.Drawing.RectangleF]$Rectangle,
        [float]$Radius
    )

    $diameter = $Radius * 2
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $path.AddArc($Rectangle.X, $Rectangle.Y, $diameter, $diameter, 180, 90)
    $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Y, $diameter, $diameter, 270, 90)
    $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Bottom - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc($Rectangle.X, $Rectangle.Bottom - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()
    return $path
}

function Get-TransparentLogoMark {
    param([string]$Path)

    $source = [System.Drawing.Bitmap]::FromFile($Path)
    try {
        # El monograma oficial ocupa esta zona en el logo maestro.
        $cropX = 110
        $cropY = 20
        $cropWidth = 330
        $cropHeight = 210
        $mark = [System.Drawing.Bitmap]::new(
            $cropWidth,
            $cropHeight,
            [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
        )

        for ($y = 0; $y -lt $cropHeight; $y++) {
            for ($x = 0; $x -lt $cropWidth; $x++) {
                $pixel = $source.GetPixel($cropX + $x, $cropY + $y)
                $maximumChannel = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))

                # El fondo del logo maestro es oscuro. Esta transición conserva
                # el antialias del 7V y elimina únicamente el fondo.
                if ($maximumChannel -le 48) {
                    $alpha = 0
                }
                elseif ($maximumChannel -ge 98) {
                    $alpha = $pixel.A
                }
                else {
                    $alpha = [int](($maximumChannel - 48) * 255 / 50)
                    $alpha = [Math]::Min($alpha, $pixel.A)
                }

                $mark.SetPixel(
                    $x,
                    $y,
                    [System.Drawing.Color]::FromArgb($alpha, $pixel.R, $pixel.G, $pixel.B)
                )
            }
        }

        return $mark
    }
    finally {
        $source.Dispose()
    }
}

function New-SiteIcon {
    param([System.Drawing.Bitmap]$LogoMark)

    $canvas = [System.Drawing.Bitmap]::new(
        512,
        512,
        [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    )
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)

    try {
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.Clear([System.Drawing.Color]::Transparent)

        $tileRectangle = [System.Drawing.RectangleF]::new(10, 10, 492, 492)
        $tilePath = New-RoundedRectanglePath -Rectangle $tileRectangle -Radius 82
        try {
            $background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
                $tileRectangle,
                [System.Drawing.ColorTranslator]::FromHtml("#031326"),
                [System.Drawing.ColorTranslator]::FromHtml("#061D3A"),
                [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal
            )
            try {
                $graphics.FillPath($background, $tilePath)
            }
            finally {
                $background.Dispose()
            }
        }
        finally {
            $tilePath.Dispose()
        }

        # El favicon debe reproducir el monograma oficial sin símbolos añadidos.
        $graphics.DrawImage(
            $LogoMark,
            [System.Drawing.RectangleF]::new(42, 116, 428, 272)
        )

        return $canvas
    }
    finally {
        $graphics.Dispose()
    }
}

function Save-ResizedPng {
    param(
        [System.Drawing.Bitmap]$Source,
        [int]$Size,
        [string]$Path
    )

    $bitmap = [System.Drawing.Bitmap]::new(
        $Size,
        $Size,
        [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    )
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

    try {
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.DrawImage($Source, 0, 0, $Size, $Size)
        $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $graphics.Dispose()
        $bitmap.Dispose()
    }
}

$logoMark = Get-TransparentLogoMark -Path $sourcePath
try {
    $siteIcon = New-SiteIcon -LogoMark $logoMark
    try {
        foreach ($size in @(16, 32, 48, 180, 192, 512)) {
            $outputPath = Join-Path $outputDirectory "favicon-7v-$size.png"
            Save-ResizedPng -Source $siteIcon -Size $size -Path $outputPath
        }
    }
    finally {
        $siteIcon.Dispose()
    }
}
finally {
    $logoMark.Dispose()
}

Write-Output "Generated official 7V icons in $outputDirectory"
