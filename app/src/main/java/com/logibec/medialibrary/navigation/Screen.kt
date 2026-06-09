package com.logibec.medialibrary.navigation

sealed class Screen(val route: String) {
    // Destinos del Bottom Navigation
    data object Home    : Screen("home")
    data object Library : Screen("library")
    data object Search  : Screen("search")
    data object Profile : Screen("profile")

    // Destinos con argumentos
    data object AddEdit : Screen("add_edit/{itemId}") {
        fun createRoute(itemId: String = "new") = "add_edit/$itemId"
        const val ARG_ITEM_ID = "itemId"
    }

    data object Detail : Screen("detail/{itemId}") {
        fun createRoute(itemId: String) = "detail/$itemId"
        const val ARG_ITEM_ID = "itemId"
    }

    // Autenticación
    data object Login : Screen("login")
}
