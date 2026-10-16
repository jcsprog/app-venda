import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function DetalhesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastros</Text>

      <Pressable style={styles.btn_chamada} onPress={() => router.push('./empresa')}>
        <Text style={styles.txt_ver}>Empresa</Text>
      </Pressable>

      <Pressable style={styles.btn_chamada} onPress={() => router.push('./cliente')}>
        <Text style={styles.txt_ver}>Clientes</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#FF3B30', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
       btn_chamada:{
        padding: 10,
        fontSize: 20,
        backgroundColor: '#41AEF4',
        borderRadius:30,
        marginBottom: 10,
        marginTop: 10,
      },
          txt_ver:{
        fontSize: 20,
     },  
});
