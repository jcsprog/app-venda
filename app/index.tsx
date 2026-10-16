import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Vendas</Text>

      {/* Opção 2: Usando o hook useRouter com botão */}
      <Pressable style={styles.btn_chamada} onPress={() => router.push('./detalhes')}>
        <Text style={styles.txt_ver}>Cadastros</Text>
      </Pressable>

      {/* Opção 2: Usando o hook useRouter com botão */}
      <Pressable style={styles.btn_chamada} onPress={() => router.push('./detalhes')}>
        <Text style={styles.txt_ver}>Vendas</Text>
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

