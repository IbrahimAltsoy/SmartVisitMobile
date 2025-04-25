import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Register.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

// Form veri tipi
interface FormData {
  name: string;
  surname: string;
  phone: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

// Hata mesajları tipi
interface FormErrors {
  name?: string;
  surname?: string;
  phone?: string;
  companyName?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    phone: "",
    companyName: "",

    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {};

    // Ad validasyon
    if (!formData.name.trim()) {
      newErrors.name = "Ad zorunludur";
      valid = false;
    }

    // Soyad validasyon
    if (!formData.surname.trim()) {
      newErrors.surname = "Soyad zorunludur";
      valid = false;
    }

    // Telefon validasyon
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon numarası zorunludur";
      valid = false;
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Geçerli bir telefon numarası girin";
      valid = false;
    }

    // Şirket adı validasyon
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Şirket adı zorunludur";
      valid = false;
    }

    // Şifre validasyon
    if (!formData.password) {
      newErrors.password = "Şifre zorunludur";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Şifre en az 8 karakter olmalıdır";
      valid = false;
    }

    // Şifre tekrar validasyon
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      // Kayıt işlemi burada yapılacak
      Alert.alert("Başarılı", "Kayıt işlemi başarıyla tamamlandı");
      console.log("Kayıt bilgileri:", formData);
    }
  };

  const handleChange = <K extends keyof FormData>(
    name: K,
    value: FormData[K]
  ): void => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Hata mesajını temizle
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  return (
    <LinearGradient
      colors={["#fff", "#0099a1", "#04aab3"]}
      // source={require("../../../assets/login.png")}

      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.overlay}>
            <Text style={styles.title}>Yeni Hesap Oluştur</Text>

            {/* Ad Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ad"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Soyad Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Soyad"
                placeholderTextColor="#999"
                value={formData.surname}
                onChangeText={(text) => handleChange("surname", text)}
              />
              {errors.surname && (
                <Text style={styles.errorText}>{errors.surname}</Text>
              )}
            </View>

            {/* Telefon Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Telefon"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Şirket Adı Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Şirket Adı"
                placeholderTextColor="#999"
                value={formData.companyName}
                onChangeText={(text) => handleChange("companyName", text)}
              />
              {errors.companyName && (
                <Text style={styles.errorText}>{errors.companyName}</Text>
              )}
            </View>

            {/* Adres Input */}
            {/* <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Adres"
                placeholderTextColor="#999"
                multiline
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
              />
              {errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}
            </View> */}

            {/* Şifre Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifre"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Şifre Tekrar Input */}
            <View style={styles.inputContainer}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifre Tekrar"
                  placeholderTextColor="#999"
                  secureTextEntry={!showConfirmPassword}
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleChange("confirmPassword", text)}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Kayıt Ol Butonu */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSubmit}
            >
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginText}>
                Zaten hesabınız var mı?{" "}
                <Text style={styles.loginLink}>Giriş Yap</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default RegisterScreen;
