# Hilt
-keep class dagger.hilt.** { *; }
-keep @dagger.hilt.android.HiltAndroidApp class * { *; }
-keep @dagger.hilt.android.AndroidEntryPoint class * { *; }

# Room
-keep class * extends androidx.room.RoomDatabase
-keep @androidx.room.Entity class * { *; }
-dontwarn androidx.room.paging.**

# Firebase
-keepattributes Signature
-keepattributes *Annotation*
-keepnames class com.google.firebase.**
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Kotlin Serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keepclassmembers class kotlinx.serialization.json.** {
    *** Companion;
}
-keep @kotlinx.serialization.Serializable class * { *; }

# Coil
-dontwarn okhttp3.**
-dontwarn okio.**
