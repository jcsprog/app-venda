import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function cliente(){
   const router = useRouter();

  const [apelido , setApelido] = useState('');
  const [nomecli , setNomecli] = useState('');
  const [endcli , setEndcli] = useState('');
  const [telcli , setTelcli] = useState('');  
  const [cidcli , setCidcli] = useState('');
  const [situcli , setSitucli] = useState('I');
  const [selectlista, setSelectedItem] = useState<string | null>(null);
  
  const adados=[{
    apelido,
    nomecli,
    endcli,
    telcli,
    cidcli,
  }];

  const Acli={
    apelido,
    nomecli,
    endcli,
    telcli,
    cidcli,
  };

   function limpaDados(){
    setNomecli('');
    setEndcli('');
    setTelcli('');
    setCidcli('');
    setApelido('');
   };

  useEffect(() => {
     CriaLista();
  }, [apelido]); // Roda sempre que 'contador' for atualizado

  // gera lista de clie
   async function CriaLista(){
      const resposta = await AsyncStorage.getItem('@Cliente');
      const dados = resposta ? JSON.parse(resposta):[];
      setLista(dados);
    };
  
    // ver aleracao
    function Verifialteracao(){
       Alert.alert("Atenção" ,"Ao final da Alteração de Cadastro. Click em Confirma!!");
      setSitucli("A");
    };
    
    async function removecli(vcli: string){
     let arr = listacli.filter(function(item) {
     return item.apelido !== vcli
     })
     setLista(arr);
    
      await AsyncStorage.removeItem("@Cliente");
      await AsyncStorage.setItem("@Cliente",JSON.stringify(arr));
      Alert.alert("Exclusão !","Realizada com Exito.")
      setSitucli("I");    
      limpaDados();
      };

    const [listacli , setLista] = useState(adados);
    
    function verCli(vcli: string){

        const resposta = listacli.find(listacli => listacli.apelido === vcli);
        const _posicao = resposta ? resposta :" ";
 
        if (_posicao != " "){
           setApelido(_posicao.apelido);
           setNomecli(_posicao.nomecli);
           setEndcli(_posicao.endcli);
           setTelcli(_posicao.telcli);
           setCidcli(_posicao.cidcli);

           Alert.alert(
            'Informações Cadastradas','Apelido:'+_posicao.apelido+'\n'+'Nome:'+_posicao.nomecli+
            '\n'+'End.:'+_posicao.endcli+'\n'+'Tel.:'+_posicao.telcli+'\n'+'Cidade:'+_posicao.cidcli+'\n'+' '+'\n'+' Veja as Opções ?',
            [
              { text: 'Alterar', onPress: () => Verifialteracao()},
              { text: 'Excluir', onPress: () => removecli(vcli)},
              { text: 'Cancela', onPress: () =>  limpaDados()},
            ],
           );
        };
      };

      async function ValidaCli(){
        if(apelido == ''){
          Alert.alert('Atenção!', 'Apelido Não pode estar Vazio!');
          } else if(apelido != ' '){
    
            if(situcli == "I"){
              const resposta = await AsyncStorage.getItem("@Cliente");
              const listaCli = resposta != null ? JSON.parse(resposta) : [];

              const clienteEncontrado = listaCli.find((cliente: { apelido: string }) => cliente.apelido === apelido);
 
              if( clienteEncontrado ==null){
                const matriz = resposta ? JSON.parse(resposta):[];
                const dados = [...matriz,Acli];
                await AsyncStorage.setItem("@Cliente",JSON.stringify(dados));
                setLista(dados);
                Alert.alert('Inclusão!', 'Realizada com Exito ('+apelido+')!');
                limpaDados();
              }else {
               Alert.alert("Atenção" ,"Apelido já cadastrado. Modifique");
              }
            } else if(situcli == "A"){
    
              let arr = listacli.filter(function(item) {
                return item.apelido !== apelido
              })
              setLista(arr);
    
              await AsyncStorage.removeItem("@Cliente");
              //const matriz = resposta ? JSON.parse(resposta):[];
              const dados = [...arr,Acli];
              await AsyncStorage.setItem("@Cliente",JSON.stringify(dados));
          
              Alert.alert('Alteração!', 'Realizada Com Exito ('+apelido+')!');
              {CriaLista()};
              limpaDados();
            }   
            setSitucli("I");  
         }
         }
  return (

      <View style={{ flex:1 }}>
 
      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <Text style={globalstyles.campo_b}>  Apelido  </Text> 
        
        <Pressable 
          onPress={() => {CriaLista()}}
          style={globalstyles.campo_b}>
         <Text style={{  textAlign: 'center',fontSize: 18}}>  Consulta  </Text>
         </Pressable>
      </View>
        <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
          <TextInput style={{ 
            backgroundColor: '#121212',
            borderRadius:10,
            fontSize: 18,
            color: '#fff',
            width: 180,
            height: 40,
            }}
            value={apelido}
            onChangeText={(apelido) => setApelido(apelido)}
           />
          
           <Picker<string | null>
             selectedValue={selectlista}
             style={{ height: 35, width: 180, fontSize: 14, backgroundColor: '#41AEF4'}}
             onValueChange={(itemValue) => {
               setSelectedItem(itemValue);
               if (itemValue !== null) verCli(itemValue);
             }}
             >
            <Picker.Item          
              label="Apelidos" value={null} />
              {listacli.map((item, index) => (
              <Picker.Item style={{fontSize: 14}} key={item.apelido} label={item.apelido+"-"+item.nomecli} value={item.apelido} />
              ))}
            </Picker>
        </View>   
        <Text style={globalstyles.campo_b}>Nome</Text> 
        <TextInput style={globalstyles.campo_a}
          value={nomecli}
          onChangeText={(nomecli) => setNomecli(nomecli)}
        />     

        <Text style={globalstyles.campo_b}>Endereço</Text> 
        <TextInput style={globalstyles.campo_a}
          value={endcli}
          onChangeText={(endcli) => setEndcli(endcli)}
        />       

      <View style={{flexDirection: "row",justifyContent: "space-between"}} > 
        <Text style={globalstyles.campo_b}>Telefone/Celular</Text> 
        <Text style={globalstyles.campo_b}>     Cidade      </Text> 
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
          value={telcli}
          onChangeText={(telcli) => setTelcli(telcli)}
        />               

        <TextInput style={{ 
          backgroundColor: '#121212',
          borderRadius:10,
          fontSize: 18,
          color: '#fff',
          width: 125,
          height: 40, 
          }}
          value={cidcli}
          onChangeText={(cidcli) => setCidcli(cidcli)}
        />    
      </View>

      <View style={{flexDirection: "row",justifyContent: "space-between"}} >
        <Pressable
          onPress={() => {ValidaCli()}}
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