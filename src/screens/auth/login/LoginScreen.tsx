import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { styles } from "./Login.styles";
import { Ionicons } from "@expo/vector-icons";
import { LoginCommand } from "../../../types/auth/login/LoginCommand";
import AuthContext from "../../../context/AuthContext";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scaleValue] = useState(new Animated.Value(1));
  const { login }: any = useContext(AuthContext);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  const handleLogin = async () => {
    const loginData: LoginCommand = {
      email: email,
      password: password,
    };
    try {
      const result = await login(loginData);
      console.log("giriş yapıldı.");
      // Burada örnek olarak ana sayfaya yönlendirme yapılabilir:
      // navigation.navigate("Home");
    } catch (error: any) {
      console.error("Giriş başarısız:", error.message);
      // Alert veya Toast gösterilebilir
    }
  };

  return (
    <LinearGradient
      colors={["#fff", "#0099a1", "#04aab3"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Logo ve Açıklama */}
        <View style={styles.infoContainer}>
          <Animated.View
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: scaleValue }],
              },
            ]}
          >
            <Image
              source={require("../../../assets/login.png")}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* Giriş Formu */}
        <Animated.View
          style={[
            styles.formCard,
            {
              shadowColor: "#6B46C1",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
            },
          ]}
        >
          <Text style={styles.slogan}>
            Zaman kaybetme, sıranı SmartVisit ile al!
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#A0AEC0"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Telefon veya E-posta"
              placeholderTextColor="#A0AEC0"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#A0AEC0"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="#A0AEC0"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#718096"
              />
            </TouchableOpacity>
          </View>

          {/* Giriş Butonu */}
          <TouchableOpacity
            style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#494d61", "#000"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Şifremi Unuttum */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
          </TouchableOpacity>

          {/* Ayırıcı Çizgi */}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            {/* <Text style={styles.orText}>veya</Text> */}
            <View style={styles.orLine} />
          </View>

          {/* Sosyal Medya Girişleri */}
          {/* <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={20} color="#4267B2" />
            </TouchableOpacity>
          </View> */}
        </Animated.View>

        {/* Kayıt Linki */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabınız yok mu?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}> Kayıt olun</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;
