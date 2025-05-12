import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductTable from "./components/ProdutoTabela";
import ProductForm from "./components/ProdutoForm";
import { Product, emptyProduct } from "@/types/Produto";
import { Plus, Search, ArrowLeft, PlusCircle, Divide } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { productFormSchema } from "@/types/Product";
import ManufaturaTab from "@/components/produto/ManufaturaTab";
import { FormProvider, useForm } from "react-hook-form";
import { ProductFormValues } from "@/types/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import CriarProduto from "./components/CriarProduto";
import { ProductForm2 } from "./components/testnewform/ProductForm";

const Produto = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      category: "Produto",
      productCode: "TF-400",
      reference: "",
      brandOrigin: "",
      model: "",
      productDescription: "Celula de carga para conversor de pesagem",
      fiscalClassificationCode: "8479.90.90",
      ipiPercentage: 0.0,
      unit: "PÇ",
      stockQuantity: 0,
      netWeight: 5.2,
      manufacturingTime: 30,
      hasCAD: true,
      observation: "R S - ROBERTO - R$ 1920,00  - SIMPLES SEM IMPOSTOS - 03/09/2013",
      netCost: 1920.00,
      grossCost: 1920.00
    },
    {
      id: "2",
      category: "Periféricos",
      productCode: "PE002",
      reference: "KBD-MEC-RGB",
      brandOrigin: "KeyMaster",
      model: "Teclado Mecânico",
      productDescription: "Teclado Mecânico RGB Switch Blue",
      fiscalClassificationCode: "8471.60.52",
      ipiPercentage: 10,
      unit: "UN",
      stockQuantity: 45,
      netWeight: 0.95,
      manufacturingTime: 15,
      hasCAD: false,
      observation: "Keycaps extras inclusos",
      netCost: 350.00,
      grossCost: 385.00
    },
    {
      id: "3",
      category: "Acessórios",
      productCode: "AC003",
      reference: "MS-ERGONOMIC",
      brandOrigin: "ComfortTech",
      model: "Mouse Ergonômico",
      productDescription: "Mouse Ergonômico Sem Fio",
      fiscalClassificationCode: "8471.60.53",
      ipiPercentage: 8,
      unit: "UN",
      stockQuantity: 60,
      netWeight: 0.12,
      manufacturingTime: 10,
      hasCAD: true,
      observation: "Inclui receptor USB",
      netCost: 120.00,
      grossCost: 129.60
    },
    {
      id: "4",
      category: "Componentes",
      productCode: "CO004",
      reference: "SSD-1TB-M2",
      brandOrigin: "SpeedStore",
      model: "SSD 1TB M.2",
      productDescription: "SSD 1TB M.2 NVMe",
      fiscalClassificationCode: "8471.70.12",
      ipiPercentage: 12,
      unit: "UN",
      stockQuantity: 35,
      netWeight: 0.02,
      manufacturingTime: 25,
      hasCAD: false,
      observation: "Velocidade de leitura até 7000MB/s",
      netCost: 600.00,
      grossCost: 672.00
    },
    {
      id: "5",
      category: "Hardware",
      productCode: "HW005",
      reference: "GPU-RTX4070",
      brandOrigin: "GraphicsPro",
      model: "Placa de Vídeo RTX 4070",
      productDescription: "Placa de Vídeo NVIDIA RTX 4070 12GB",
      fiscalClassificationCode: "8471.80.00",
      ipiPercentage: 18,
      unit: "UN",
      stockQuantity: 15,
      netWeight: 1.2,
      manufacturingTime: 45,
      hasCAD: true,
      observation: "Requer fonte 750W ou superior",
      netCost: 4500.00,
      grossCost: 5310.00
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const filteredProducts = products.filter(
    (product) =>
      product.productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído com sucesso.",
    });
  };

  const handleSaveProduct = (product: Product) => {
    if (products.some(p => p.id === product.id)) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      });
    } else {
      // Add new product
      setProducts([...products, product]);
      toast({
        title: "Produto adicionado",
        description: "O produto foi adicionado com sucesso.",
      });
    }
    setFormOpen(false);
  };

  const handleCancelForm = () => {
    setFormOpen(false);
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      description: "",
      observation: "",
      quantity: 0,
      netWeight: 0,
      grossCost: 0,
      profitMargin: 0,
      additionalCosts: 0,
      project: { value: 0, iss: 0 },
      commercial: { value: 0, ipi: 0, icms: 0 },
      machining: { value: 0, iss: 0 },
      coating: { value: 0, ipi: 0, icms: 0 },
      transport: { value: 0, iss: 0, icms: 0 },
      toto: { value: 0, iss: 0 },
      rawMaterial: { value: 0, ipi: 0, icms: 0 },
      boilermaking: { value: 0, iss: 0 },
      milling: { value: 0, iss: 0 },
      painting: { value: 0, iss: 0 },
      finishing: { value: 0, iss: 0, icms: 0 },
      travelExpenses: { value: 0, iss: 0 },
      packaging: 0,
      others: 0,
    },
  })

  const calculateTotals = () => {
    const values = form.getValues();

    const totalIss = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'iss' in value) {
        return acc + ((value.value * value.iss) / 100);
      }
      return acc;
    }, 0);

    const totalIpi = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'ipi' in value) {
        return acc + ((value.value * value.ipi) / 100);
      }
      return acc;
    }, 0);

    const totalIcms = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'icms' in value) {
        return acc + ((value.value * value.icms) / 100);
      }
      return acc;
    }, 0);

    const totalCost = Object.entries(values).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && value !== null && 'value' in value) {
        return acc + value.value;
      }
      if (key === 'packaging' || key === 'others') {
        return acc + (value as number);
      }
      return acc;
    }, 0);

    const grossCost = totalCost + totalIss + totalIpi + totalIcms;
    const netCost = totalCost;

    return {
      totalIss: totalIss.toFixed(2),
      totalIpi: totalIpi.toFixed(2),
      totalIcms: totalIcms.toFixed(2),
      totalCost: totalCost.toFixed(2),
      grossCost: grossCost.toFixed(2),
      netCost: netCost.toFixed(2),
    };
  };

  const handleFormSubmit = (data: any) => {
    console.log("Formulário enviado:", data);
    // Aqui você pode adicionar a lógica para salvar os dados no backend
  };


  return (

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
              <p className="mt-1 text-gray-500">
                Gerencie as naturezas de operação do seu negócio
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => {
                  setFormOpen(true);
                  setTimeout(() => {
                    setIsVisible(true);
                  }, 100);
                }}
                className="flex items-center bg-navy hover:bg-navy/90 hover:text-purple-200 text-white transition-all duration-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo produto
              </Button>
            </div>
          </section>

          {formOpen ? (
            // <Card className={`flex flex-col space-y-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            //   <CardHeader className="pb-3">
            //     <div className="flex items-center">
            //       <Button
            //         variant="ghost"
            //         size="sm"
            //         onClick={() => {
            //           setFormOpen(false)
            //           setIsVisible(false);
            //         }}
            //         className="mr-2"
            //       >
            //         <ArrowLeft className="h-4 w-4" />
            //       </Button>
            //       <CardTitle>
            //         {currentProduct?.id ? "Editar" : "Novo"} produto
            //       </CardTitle>
            //     </div>
            //   </CardHeader>

            //   <CardContent className="py-4">
            //     <ProductForm
            //       product={currentProduct || emptyProduct}
            //       onSave={handleSaveProduct}
            //       onCancel={handleCancelForm}
            //     />
            //   </CardContent>
            // </Card>
            // <CriarProduto/>
            <ProductForm2 onSubmit={handleFormSubmit} onCloseForm={setFormOpen}/>
            // <ManufaturaTab form={form} calculateTotals={calculateTotals} />
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar produtos..."
                    className="pl-8 w-full md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Card>
                <CardContent>
                  {filteredProducts.length > 0 ? (
                    <ProductTable
                      products={filteredProducts}
                      onEdit={handleEditProduct}
                      onDelete={handleDeleteProduct}
                    />
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">
                        {searchQuery
                          ? "Nenhum produto encontrado para a busca."
                          : "Nenhum produto cadastrado. Comece adicionando um novo produto."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
  );
};

export default Produto;