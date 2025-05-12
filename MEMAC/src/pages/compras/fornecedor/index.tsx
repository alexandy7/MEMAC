
import { Building, MapPin, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EnderecoForm } from "./components/endereco/EnderecoForm";
import { EnderecosList } from "./components/endereco/EnderecosList";
import { FornecedorDadosForm, FornecedorFormValues } from "./components/FornecedorDadosForm";
import { FornecedoresList } from "./components/FornecedoresList";
import { ContatoForm } from "./components/contato/ContatoForm";
import type { FornecedorData, EnderecoData, ContatoData } from "../../../types/Fornecedor";
import { ContatosList } from "./components/contato/ContatosList";

// Dummy data for suppliers
const fornecedores = [
  { id: "000404", razaoSocial: "Fornecedor A LTDA", cnpj: "12.345.678/0001-90", municipio: "São Paulo", uf: "SP" },
  { id: "000405", razaoSocial: "Indústria B S.A.", cnpj: "98.765.432/0001-21", municipio: "Rio de Janeiro", uf: "RJ" },
  { id: "000406", razaoSocial: "Comércio C EIRELI", cnpj: "11.222.333/0001-44", municipio: "Belo Horizonte", uf: "MG" },
];

// Dummy data for addresses
const enderecosIniciais = [
  { 
    codigo: "01", 
    tipo: "Fiscal", 
    endereco: "Rua Tucano 63", 
    bairro: "JD CALIFORNIA", 
    municipio: "BARUERI", 
    uf: "SP", 
    cep: "06640-930",
    cnpj: "53.946.226/0001-74" 
  }
];

// Dummy data for contacts
const contatosIniciais = [
  {
    codigo: "01",
    nome: "Sra. Angélica Albino",
    cargo: "Assessor",
    poderDecisao: "Autoridade limitada",
    areaAtuacao: "Vendas",
    telefone1: "(11)4161-1006",
    telefone2: "",
    fax: "(11)4161-1006",
    celular: "",
    email: "atendimento@visex.com.br",
    obs: ""
  }
];

const Fornecedores = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<FornecedorData | null>(null);
  const [activeTab, setActiveTab] = useState("dados");
  
  // State for managing addresses
  const [enderecos, setEnderecos] = useState<EnderecoData[]>(enderecosIniciais);
  const [editingEndereco, setEditingEndereco] = useState<EnderecoData | null>(null);

  // State for managing contacts
  const [contatos, setContatos] = useState<ContatoData[]>(contatosIniciais);
  const [editingContato, setEditingContato] = useState<ContatoData | null>(null);

  const handleSelectFornecedor = (fornecedor: FornecedorData) => {
    setSelectedFornecedor(fornecedor);
    setIsEditing(true);
    
    // Set form initial values based on selected supplier
    const initialValues = {
      codigo: fornecedor.id,
      cnpj: fornecedor.cnpj,
      razaoSocial: fornecedor.razaoSocial,
      nomeReduzido: fornecedor.razaoSocial.split(" ")[0],
      municipio: fornecedor.municipio,
      uf: fornecedor.uf,
      // Default empty values for other fields
      inscricaoEstadual: "",
      inscricaoMunicipal: "",
      endereco: "",
      bairro: "",
      cep: "",
      telefone: "",
      fax: "",
      caixaPostal: "",
      atividade: "",
      naturezaOperacao: "",
      comissao: "",
      transportadora: "",
      condPagto: "",
      banco: "",
      contaCorrente: "",
      enderecoWeb: "",
      email: "",
      obs: "",
    };
    
    setInitialFormValues(initialValues);
  };

  const handleNewFornecedor = () => {
    setSelectedFornecedor(null);
    setIsEditing(true);
    setEnderecos([]);
    setContatos([]);
    
    // Generate next supplier code
    const nextCode = String(Number(fornecedores[fornecedores.length - 1]?.id || "000400") + 1).padStart(6, "0");
    
    // Set empty initial values for new supplier
    setInitialFormValues({
      codigo: nextCode,
      cnpj: "",
      razaoSocial: "",
      nomeReduzido: "",
      inscricaoEstadual: "",
      inscricaoMunicipal: "",
      endereco: "",
      bairro: "",
      municipio: "",
      uf: "",
      cep: "",
      telefone: "",
      fax: "",
      caixaPostal: "",
      atividade: "",
      naturezaOperacao: "",
      comissao: "",
      transportadora: "",
      condPagto: "",
      banco: "",
      contaCorrente: "",
      enderecoWeb: "",
      email: "",
      obs: "",
    });
  };

  const [initialFormValues, setInitialFormValues] = useState<FornecedorFormValues>({
    codigo: "",
    cnpj: "",
    razaoSocial: "",
    nomeReduzido: "",
    inscricaoEstadual: "",
    inscricaoMunicipal: "",
    endereco: "",
    bairro: "",
    municipio: "",
    uf: "",
    cep: "",
    telefone: "",
    fax: "",
    caixaPostal: "",
    atividade: "",
    naturezaOperacao: "",
    comissao: "",
    transportadora: "",
    condPagto: "",
    banco: "",
    contaCorrente: "",
    enderecoWeb: "",
    email: "",
    obs: "",
  });

  const handleSubmit = (data: FornecedorFormValues) => {
    // Here you would typically save the data to your backend
    console.log("Form submitted:", data);
    console.log("Addresses:", enderecos);
    console.log("Contacts:", contatos);
    alert("Fornecedor salvo com sucesso!");
    // toast.success("Fornecedor salvo com sucesso!");
    setIsEditing(false);
  };

  // Address management functions
  const handleNewEndereco = () => {
    // Generate the next code for the address
    const nextCode = String(enderecos.length + 1).padStart(2, "0");
    
    setEditingEndereco({
      codigo: nextCode,
      tipo: "",
      endereco: "",
      bairro: "",
      municipio: "",
      uf: "",
      cep: "",
      cnpj: "",
    });
  };

  const handleEditEndereco = (endereco: EnderecoData) => {
    setEditingEndereco(endereco);
  };

  const handleDeleteEndereco = (codigo: string) => {
    setEnderecos(enderecos.filter(e => e.codigo !== codigo));
    alert("Endereço removido com sucesso!");
    // toast.success("Endereço removido com sucesso!");
  };

  const handleEnderecoSubmit = (data: EnderecoData) => {
    const existingIndex = enderecos.findIndex(e => e.codigo === data.codigo);
    
    if (existingIndex >= 0) {
      // Update existing address
      const updatedEnderecos = [...enderecos];
      updatedEnderecos[existingIndex] = data;
      setEnderecos(updatedEnderecos);
    } else {
      // Add new address
      setEnderecos([...enderecos, data]);
    }
    
    setEditingEndereco(null);
    alert("Endereço salvo com sucesso!");
    //toast.success("Endereço salvo com sucesso!");
  };

  // Contact management functions
  const handleNewContato = () => {
    // Generate the next code for the contact
    const nextCode = String(contatos.length + 1).padStart(2, "0");
    
    setEditingContato({
      codigo: nextCode,
      nome: "",
      cargo: "",
      poderDecisao: "",
      areaAtuacao: "",
      telefone1: "",
      telefone2: "",
      fax: "",
      celular: "",
      email: "",
      obs: "",
    });
  };

  const handleEditContato = (contato: ContatoData) => {
    setEditingContato(contato);
  };

  const handleDeleteContato = (codigo: string) => {
    setContatos(contatos.filter(c => c.codigo !== codigo));
    alert("Contato removido com sucesso!");
    // toast.success("Contato removido com sucesso!");
  };

  const handleContatoSubmit = (data: ContatoData) => {
    const existingIndex = contatos.findIndex(c => c.codigo === data.codigo);
    
    if (existingIndex >= 0) {
      // Update existing contact
      const updatedContatos = [...contatos];
      updatedContatos[existingIndex] = data;
      setContatos(updatedContatos);
    } else {
      // Add new contact
      setContatos([...contatos, data]);
    }
    
    setEditingContato(null);
    alert("Contato salvo com sucesso!");
    // toast.success("Contato salvo com sucesso!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Fornecedores</h1>
        <div className="space-x-2">
          <Link to="/">
            <Button variant="outline">Voltar</Button>
          </Link>
        </div>
      </div>

      {!isEditing ? (
        <FornecedoresList 
          fornecedores={fornecedores}
          onSelectFornecedor={handleSelectFornecedor}
          onNewFornecedor={handleNewFornecedor}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedFornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="dados" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Dados Principais
                </TabsTrigger>
                <TabsTrigger value="enderecos" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereços
                </TabsTrigger>
                <TabsTrigger value="contatos" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Contatos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dados">
                <FornecedorDadosForm 
                  initialData={initialFormValues}
                  onSubmit={handleSubmit}
                  onCancel={() => setIsEditing(false)}
                />
              </TabsContent>

              <TabsContent value="enderecos">
                {editingEndereco ? (
                  <EnderecoForm
                    initialData={editingEndereco}
                    onSubmit={handleEnderecoSubmit}
                    onCancel={() => setEditingEndereco(null)}
                  />
                ) : (
                  <EnderecosList
                    enderecos={enderecos}
                    onEditEndereco={handleEditEndereco}
                    onDeleteEndereco={handleDeleteEndereco}
                    onNewEndereco={handleNewEndereco}
                    onSalvarFornecedor={() => handleSubmit(initialFormValues)}
                    onVoltar={() => setActiveTab("dados")}
                  />
                )}
              </TabsContent>

              <TabsContent value="contatos">
                {editingContato ? (
                  <ContatoForm
                    initialData={editingContato}
                    onSubmit={handleContatoSubmit}
                    onCancel={() => setEditingContato(null)}
                  />
                ) : (
                  <ContatosList
                    contatos={contatos}
                    onEditContato={handleEditContato}
                    onDeleteContato={handleDeleteContato}
                    onNewContato={handleNewContato}
                    onSalvarFornecedor={() => handleSubmit(initialFormValues)}
                    onVoltar={() => setActiveTab("dados")}
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Fornecedores;
