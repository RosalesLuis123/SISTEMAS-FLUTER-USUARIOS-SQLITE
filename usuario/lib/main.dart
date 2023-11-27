import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Usuarios App',
      theme: ThemeData(
        primaryColor: Colors.green,
        scaffoldBackgroundColor: Colors.white,
        appBarTheme: AppBarTheme(
          color: Colors.green,
        ),
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<dynamic> usuarios = [];
  bool cargando = true;

  @override
  void initState() {
    super.initState();
    _cargarUsuarios();
  }

  Future<void> _cargarUsuarios() async {
    try {
      final response =
          await http.get(Uri.parse('http://192.168.0.156:3000/usuarios/json'));

      if (response.statusCode == 200) {
        final decodedData = json.decode(response.body);
        print('Datos de respuesta: $decodedData');

        if (decodedData.containsKey('usuarios')) {
          setState(() {
            usuarios = decodedData['usuarios'];
            usuarios.sort((a, b) => (b['nombre'] ?? '')
                .length
                .compareTo((a['nombre'] ?? '').length));
            cargando = false;
          });
        } else {
          print('La respuesta no contiene la clave "usuarios".');
        }
      } else {
        print('Error al cargar usuarios. Estado: ${response.statusCode}');
        throw Exception(
            'Error al cargar usuarios. Estado: ${response.statusCode}');
      }
    } catch (e) {
      print('Error de conexión: $e');
      setState(() {
        cargando = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Lista de Usuarios',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20.0,
          ),
        ),
      ),
      body: cargando
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: usuarios.length,
              itemBuilder: (context, index) {
                final usuario = usuarios[usuarios.length - 1 - index];
                return ListTile(
                  title: Text(
                    usuario['nombre'] ?? 'Sin nombre',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    usuario['email'] ?? 'Sin correo',
                    style: TextStyle(
                      color: Colors.black,
                    ),
                  ),
                  tileColor: Colors.green.withOpacity(0.3),
                );
              },
            ),
    );
  }
}
