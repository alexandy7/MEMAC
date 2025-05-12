import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import RepresentativeTable from "./components/Table";
import CreateRepresentativeModal from "./components/RepresentativeForm";
import { Representative } from "../../../types/Representative";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Dados de exemplo
const mockRepresentatives: Representative[] = [
  {
    id: "1",
    fullName: "TransLog Transportes LTDA",
    shortName: "TransLog",
    phone: "11 81725926",
    city: "Campinas",
    state: "SP",
    document: "12.345.678/0001-90",
    contact: "Mariana Silva (Coordenadora Logística)",
    zipCode: "13000-000",
    address: "Rua das Transportadoras, 100",
    email: "contact@TransLog.com",
    commission: "5%",
    notes: "Representante de vendas para o estado de SP",
    neighborhood: "Jardim das Flores",
  },
  {
    id: "2",
    fullName: "Rápido Sul Transportes ME",
    shortName: "Rápido Sul",
    phone: "11 10724487",
    city: "Porto Alegre",
    state: "RS",
    document: "98.765.432/0001-10",
    contact: "Carlos Oliveira (Responsável Técnico)",
    zipCode: "90000-000",
    address: "Av. dos Transportes, 200",
    email: "contact@RpidoSul.com",
    commission: "4%",
    notes: "Representante de vendas para o estado do RS",
    neighborhood: "Centro",
  }
];

const VendedorRepresentante = () => {
  const [representatives, setRepresentatives] = useState<Representative[]>(mockRepresentatives);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepresentatives, setFilteredRepresentatives] = useState<Representative[]>(representatives);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [representativeToEdit, setRepresentativeToEdit] = useState<Representative | undefined>(undefined);

  // Filtrar representantes com base no termo de busca
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRepresentatives(representatives);
      return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = representatives.filter(rep => 
      rep.fullName.toLowerCase().includes(searchTermLower) ||
      rep.shortName.toLowerCase().includes(searchTermLower) ||
      rep.city.toLowerCase().includes(searchTermLower) ||
      rep.document.toLowerCase().includes(searchTermLower) ||
      rep.contact.toLowerCase().includes(searchTermLower)
    );
    
    setFilteredRepresentatives(filtered);
  }, [searchTerm, representatives]);

  const handleAddRepresentative = () => {
    setRepresentativeToEdit(undefined);
    setIsModalOpen(true);
  };

  const handleEditRepresentative = (representative: Representative) => {
    setRepresentativeToEdit(representative);
    setIsModalOpen(true);
  };

  const handleDeleteRepresentative = (id: string) => {
    setRepresentatives(prev => prev.filter(rep => rep.id !== id));
    toast.success("Representante excluído com sucesso");
  };

  const handleSaveRepresentative = (data: Omit<Representative, 'id'>) => {
    if (representativeToEdit) {
      // Editar existente
      setRepresentatives(prev => prev.map(rep => 
        rep.id === representativeToEdit.id ? { ...data, id: rep.id } : rep
      ));
      toast.success("Representante atualizado com sucesso");
    } else {
      // Criar novo
      const newId = (representatives.length + 1).toString();
      setRepresentatives(prev => [...prev, { ...data, id: newId }]);
      toast.success("Representante cadastrado com sucesso");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-6">
      <div>
        <h1 className="text-3xl font-bold">Vendedores e Representantes</h1>
        <p className="text-gray-500 mt-1">Visualize e cadastre vendedores e representantes do seu negócio.</p>
      </div>
      <Button 
        onClick={handleAddRepresentative} 
        className="mt-4 md:mt-0 bg-navy hover:bg-navy/90 text-white transition-all duration-300"
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo representante
      </Button>
    </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar representantes..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <RepresentativeTable 
        representatives={filteredRepresentatives}
        onEdit={handleEditRepresentative}
        onDelete={handleDeleteRepresentative}
      />
      
      <CreateRepresentativeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRepresentative}
        initialData={representativeToEdit}
      />
    </div>
  );
};

export default VendedorRepresentante;