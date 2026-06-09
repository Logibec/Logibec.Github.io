package com.logibec.medialibrary.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColorScheme = darkColorScheme(
    primary            = NetflixRed,
    onPrimary          = Color.White,
    primaryContainer   = NetflixRedDark,
    onPrimaryContainer = Color.White,
    secondary          = NetflixRed,
    onSecondary        = Color.White,
    background         = Background,
    onBackground       = OnBackground,
    surface            = Surface,
    onSurface          = OnSurface,
    surfaceVariant     = SurfaceVariant,
    onSurfaceVariant   = OnSurfaceVariant,
    outline            = Divider,
    error              = Color(0xFFCF6679),
    onError            = Color.Black,
)

@Composable
fun MyVaultTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography  = Typography,
        content     = content
    )
}
