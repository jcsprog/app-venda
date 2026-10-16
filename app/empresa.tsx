import { useRouter } from 'expo-router';
import { useState,useEffect } from 'react';
import { Alert, Pressable, Text, View, TextInput, StyleSheet } from 'react-native';
import api from './cor/api';

export default function empresa() {
  const router = useRouter();
 
  const baseURL = 'http://192.168.2.103:3000';
//api.defaults.baseURL; // Get the base URL from the api instance

  const [codemp,setCodemp] = useState(1);
  const [nomemp , setNomemp] = useState('');
  const [endemp , setEndemp] = useState('');
  const [telemp , setTelemp] = useState('');  
  const [cepemp , setCepemp] = useState('');  
  const [cidemp, setCidemp] = useState('');
  const [ufemp, setUfemp] = useState('');
  const [numerordem, setNumerordem] = useState("");
  const [ncli, setNcli] = useState("1");

  // 1. Criação da variável de estado para guardar os dados
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 2. Função assíncrona para buscar os dados na API
    async function buscarDados() {
      try {
        const response = await api.get(baseURL+'/lstemp');
        // 3. Gravação dos dados na variável de estado
        setDados(response.data);
        const item = response.data?.[0];
        if (item) {
          setNomemp(item.nomemp);
          setEndemp(item.endemp);
          setTelemp(item.telemp);
          setCepemp(item.cepemp);
          setCidemp(item.cidemp);
          setUfemp(item.ufemp);
          setNumerordem(item.numerordem);
          setNcli(item.ncli);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    buscarDados();
  }, []);


  const atualizarEmpresa = async () => {

    if (!nomemp) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/lstemp`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codemp,
          nomemp,
          endemp,
          telemp,
          cepemp,
          cidemp,
          ufemp,
          numerordem,
          ncli
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Empresa atualizada com sucesso');
      } else {
        Alert.alert('Erro', 'Falha ao atualizar empresa');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      Alert.alert('Erro', 'Erro de rede: ' + message);
    }
  };

  return (

    <View style={{ flex: 1}}>
        <Text style={globalstyles.txt_ver}> Codigo da Empresa : 001 </Text>

        <Text style={globalstyles.campo_b}>Empresa </Text> 
        <TextInput style={globalstyles.campo_a}
          value={nomemp}
          onChangeText={(nomemp) => setNomemp(nomemp)}
        />  

        <Text style={globalstyles.campo_b}>Endereço </Text> 
        <TextInput style={globalstyles.campo_a}
          value={endemp}
          onChangeText={(endemp) => setEndemp(endemp)}
        />     

      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <Text style={globalstyles.campo_b}>Telefone/Celular</Text> 
        <Text style={globalstyles.campo_b}>C.e.p.               </Text> 
        <Text style={globalstyles.campo_b}>UF</Text> 

      </View>  

      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
       <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 165,
          height: 40,
          }}
          value={telemp}
          onChangeText={(telemp) => setTelemp(telemp)}
        />               


        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 125,
          height: 40, 
          }}
          value={cepemp}
          onChangeText={(cepemp) => setCepemp(cepemp)}
        />    

        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 40,
          height: 40, 
          }}
          value={ufemp}
          onChangeText={(ufemp) => setUfemp(ufemp)}
        />                          
      </View>

      <View style={{flexDirection: "row"}} >
        <Text style={globalstyles.campo_b}>Cidade</Text> 
        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 145,
          height: 40, 
          margin: 5,
          }}
          value={cidemp}
          onChangeText={(cidemp) => setCidemp(cidemp)}
        />              

        <Text style={globalstyles.campo_b}>Cupom</Text> 
        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 40,
          height: 40, 
          margin: 5
          }}
          value={numerordem}
          onChangeText={(numerordem) => setNumerordem(numerordem)}
          keyboardType="numeric"
        />               
      </View>

      <View style={{flexDirection: "row",justifyContent: "space-between"}} >
        <Pressable
          onPress={() => {atualizarEmpresa()}}
          style={globalstyles.btn_chamada}>
        <Text style={{  textAlign: 'center',fontSize: 18}}>Confirma</Text>
        </Pressable>  
        

      <Pressable style={globalstyles.btn_chamada} onPress={() => router.back()}>
        <Text style={{  textAlign: 'center',fontSize: 18}}>Voltar</Text>
      </Pressable>
      </View>

    </View>
  );
}

const globalstyles = StyleSheet.create({
 
    mView : {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#fff',
     },
     btn_chamada:{
        padding: 10,
        fontSize: 20,
        backgroundColor: '#41AEF4',
        borderRadius:30,
        marginBottom: 10,
        marginTop: 10,
      },
      btn_volta:{
        padding: 10,
        fontSize: 20,
        backgroundColor: '#ff0000',
        borderRadius:30,
        marginBottom: 10,
        marginTop: 10,
      },
    Container:{
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       marginTop: 22,
      },
    modalView: {
      margin: 20,
      backgroundColor: '#f3f6f4',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      elevation: 2,
      backgroundColor: '#FF3B30',
      padding: 12,
      fontSize: 20,
         },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      fontSize: 25,
      marginBottom: 15,
      textAlign: 'center',
    },
    imageBackground: {
      justifyContent: 'center',
      width: 300,
      height: 300,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
     txt_ver:{
        fontSize: 20,
     },  
         separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    campo_a :{ 
      backgroundColor: '#121212',
      borderRadius:15,
      fontSize: 18,
      color: '#fff',
      margin: 2,
      padding: 2
       },
      campo_b :{ 
        backgroundColor: '#41AEF4',
        borderRadius:15,
        fontSize: 20,
        color: '#fff',
        textAlign: 'left',
        margin: 5,
        padding: 2
       }, 
       buttonText: {  backgroundColor: '#FF3B30',
      padding: 2,
      fontSize: 18,
      borderRadius: 20,}
  });