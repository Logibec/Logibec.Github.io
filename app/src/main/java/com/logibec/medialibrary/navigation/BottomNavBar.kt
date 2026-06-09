package com.logibec.medialibrary.navigation

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.tween
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.VideoLibrary
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Search
import androidx.compose.material.icons.outlined.VideoLibrary
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState
import com.logibec.medialibrary.ui.theme.Background
import com.logibec.medialibrary.ui.theme.Divider
import com.logibec.medialibrary.ui.theme.NetflixRed
import com.logibec.medialibrary.ui.theme.OnSurfaceVariant

private data class BottomNavItem(
    val label: String,
    val selectedIcon: ImageVector,
    val unselectedIcon: ImageVector,
    val route: String,
)

private val navItems = listOf(
    BottomNavItem("Inicio",     Icons.Filled.Home,         Icons.Outlined.Home,         Screen.Home.route),
    BottomNavItem("Biblioteca", Icons.Filled.VideoLibrary, Icons.Outlined.VideoLibrary, Screen.Library.route),
    BottomNavItem("Buscar",     Icons.Filled.Search,       Icons.Outlined.Search,       Screen.Search.route),
    BottomNavItem("Perfil",     Icons.Filled.Person,       Icons.Outlined.Person,       Screen.Profile.route),
)

@Composable
fun BottomNavBar(navController: NavController) {
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    NavigationBar(
        containerColor = Background,
        tonalElevation = 0.dp,
    ) {
        navItems.forEach { item ->
            val selected = currentRoute == item.route

            val iconColor by animateColorAsState(
                targetValue = if (selected) Color.White else OnSurfaceVariant,
                animationSpec = tween(durationMillis = 200),
                label = "iconColor"
            )

            NavigationBarItem(
                selected = selected,
                onClick = {
                    if (currentRoute != item.route) {
                        navController.navigate(item.route) {
                            popUpTo(Screen.Home.route) { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                },
                icon = {
                    Icon(
                        imageVector = if (selected) item.selectedIcon else item.unselectedIcon,
                        contentDescription = item.label,
                        tint = iconColor
                    )
                },
                label = {
                    Text(
                        text = item.label,
                        fontWeight = if (selected) FontWeight.SemiBold else FontWeight.Normal
                    )
                },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor   = Color.White,
                    selectedTextColor   = NetflixRed,
                    unselectedIconColor = OnSurfaceVariant,
                    unselectedTextColor = OnSurfaceVariant,
                    indicatorColor      = NetflixRed.copy(alpha = 0.15f)
                )
            )
        }
    }
}
