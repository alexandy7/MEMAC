import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { NaturezaOperacao } from "@/types/NaturezaOperacao";
import { useEffect, useState } from "react";
import { NaturezaList } from "./components/NaturezaList";
import { NaturezaOperacaoForm } from "./components/NaturezaForm";
import { PlusCircle } from "lucide-react";

const NaturezaOperacao = () => {
  const [naturezaOperacoes, setNaturezaOperacoes] = useState<NaturezaOperacao[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentNatureza, setCurrentNatureza] = useState<NaturezaOperacao | null>(null);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    // In a real application, this would be an API call
    const mockData: NaturezaOperacao[] = [
      {
        id: 1,
        codigo: "5101",
        cfop: "5101",
        tipo: "Entrada",
        subtipo: "Outros Estados",
        descricao: "Venda de produção do estabelecimento",
        descricaoReduzida: "Venda prod.estab.",
        condicaoIPI: "Tributado",
        condicaoICMS: "Tributado",
        percentualICMS: 18,
        percentualReducaoICMS: 0,
        validadeDuplicata: true,
        baixaEstoque: true,
      },
      {
        id: 2,
        codigo: "5102",
        cfop: "5102",
        tipo: "Saída",
        subtipo: "Exterior",
        descricao: "Venda de mercadoria adquirida ou recebida de terceiros",
        descricaoReduzida: "Venda merc.terc.",
        condicaoIPI: "Isento",
        condicaoICMS: "Tributado",
        percentualICMS: 12,
        percentualReducaoICMS: 0,
        validadeDuplicata: true,
        baixaEstoque: true,
      },
      {
        id: 3,
        codigo: "5910",
        cfop: "5910",
        tipo: "Entrada",
        subtipo: "Estado",
        descricao: "Remessa em bonificação, doação ou brinde",
        descricaoReduzida: "Rem.bonif/doação",
        condicaoIPI: "Isento",
        condicaoICMS: "Isento",
        percentualICMS: 0,
        percentualReducaoICMS: 0,
        validadeDuplicata: false,
        baixaEstoque: true,
      },
    ];

    setNaturezaOperacoes(mockData);
  }, []);

  const handleAddNatureza = (natureza: NaturezaOperacao) => {
    if (currentNatureza) {
      // Update existing
      setNaturezaOperacoes(
        naturezaOperacoes.map((item) =>
          item.id === currentNatureza.id ? { ...natureza, id: item.id } : item
        )
      );
      toast({
        title: "Natureza de operação atualizada",
        description: `${natureza.descricao} foi atualizada com sucesso.`,
      });
    } else {
      // Add new
      const newNatureza = {
        ...natureza,
        id: naturezaOperacoes.length + 1,
      };
      setNaturezaOperacoes([...naturezaOperacoes, newNatureza]);
      toast({
        title: "Natureza de operação adicionada",
        description: `${natureza.descricao} foi adicionada com sucesso.`,
      });
    }

    setShowForm(false);
    setCurrentNatureza(null);
  };

  const handleEditNatureza = (natureza: NaturezaOperacao) => {
    setCurrentNatureza(natureza);
    setShowForm(true);
  };

  const handleDeleteNatureza = (id: number) => {
    setNaturezaOperacoes(naturezaOperacoes.filter((item) => item.id !== id));
    toast({
      title: "Natureza de operação removida",
      description: "Item removido com sucesso.",
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Natureza de Operação</h1>
              <p className="mt-1 text-gray-500">
                Gerencie as naturezas de operação do seu negócio
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => {
                  setCurrentNatureza(null);
                  setShowForm(true);
                }}
                className="flex items-center bg-navy hover:bg-navy/90 hover:text-purple-200 text-white transition-all duration-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Natureza
              </Button>
            </div>
          </div>
        </section>

        {showForm ? (
          <div className="animate-fade-in">
            <NaturezaOperacaoForm
              initialData={currentNatureza}
              onSubmit={handleAddNatureza}
              onCancel={() => {
                setShowForm(false);
                setCurrentNatureza(null);
              }}
            />
          </div>
        ) : (
          <div className="animate-fade-in">
            <NaturezaList
              naturezas={naturezaOperacoes}
              onEdit={handleEditNatureza}
              onDelete={handleDeleteNatureza}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NaturezaOperacao;