import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Venda Direta' }} />
      <Stack.Screen name="detalhes" options={{ title: 'Cadastros' }} />
      <Stack.Screen name="empresa" options={{ title: 'Empresa' }} />
      <Stack.Screen name="cliente" options={{ title: 'Clientes' }} />
    </Stack>
  );
}
