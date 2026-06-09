package com.logibec.medialibrary.navigation

import androidx.compose.animation.EnterTransition
import androidx.compose.animation.ExitTransition
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInHorizontally
import androidx.compose.animation.slideOutHorizontally
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.logibec.medialibrary.presentation.home.HomeScreen
import com.logibec.medialibrary.presentation.library.LibraryScreen
import com.logibec.medialibrary.presentation.profile.ProfileScreen
import com.logibec.medialibrary.presentation.search.SearchScreen

private fun enterTransition(): EnterTransition =
    fadeIn(tween(220)) + slideInHorizontally(tween(220)) { it / 10 }

private fun exitTransition(): ExitTransition =
    fadeOut(tween(200)) + slideOutHorizontally(tween(200)) { -it / 10 }

@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    Scaffold(
        bottomBar = { BottomNavBar(navController = navController) }
    ) { paddingValues ->
        NavHost(
            navController      = navController,
            startDestination   = Screen.Home.route,
            modifier           = Modifier.padding(paddingValues),
            enterTransition    = { enterTransition() },
            exitTransition     = { exitTransition() },
            popEnterTransition = { enterTransition() },
            popExitTransition  = { exitTransition() },
        ) {
            composable(Screen.Home.route) {
                HomeScreen(navController = navController)
            }
            composable(Screen.Library.route) {
                LibraryScreen(navController = navController)
            }
            composable(Screen.Search.route) {
                SearchScreen(navController = navController)
            }
            composable(Screen.Profile.route) {
                ProfileScreen(navController = navController)
            }
            composable(
                route = Screen.AddEdit.route,
                arguments = listOf(
                    navArgument(Screen.AddEdit.ARG_ITEM_ID) {
                        type = NavType.StringType
                        defaultValue = "new"
                    }
                )
            ) {
                // Implementado en Paso 5
            }
            composable(
                route = Screen.Detail.route,
                arguments = listOf(
                    navArgument(Screen.Detail.ARG_ITEM_ID) {
                        type = NavType.StringType
                    }
                )
            ) {
                // Implementado en Paso 4
            }
        }
    }
}
