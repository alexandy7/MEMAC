import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Produtos from "./pages/geral/produto";
import NaturezaOperacao from "./pages/geral/naturezaOperacao";
import CondicaoPagamento from "./pages/geral/condicaoPagamento";
import Banco from "./pages/geral/banco";
import ListaTransportadoras from "./pages/geral/transportadora/components/ListaTransportadoras";
import MainLayout from "./components/layout/MainLayout";
import Index from '../src/pages/Index'
import Cliente from "./pages/vendas/cliente/Index";
import VendedorRepresentante from "./pages/vendas/VendedorRepresentante";
import PropostaFornecimento from "./pages/vendas/propostaFornecimento/components/PropostaFornecimento";
import ListaPropostas from "./pages/vendas/propostaFornecimento/index";
import ListaOrdens from "./pages/vendas/ordemFornecimento";
import OrdemFornecimento from "./pages/vendas/ordemFornecimento/components/OrdemFornecimento";
import Fornecedores from "./pages/compras/fornecedor";
import ListaPedidosCompra from "./pages/compras/pedidoCompra";
import PedidoCompra from "./pages/compras/pedidoCompra/components/PedidoCompra";
import Relatorios from "./pages/Relatorios";
const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            
            {/* Geral */}
            <Route path="/natureza-operacao" element={<NaturezaOperacao />} />
            <Route path="/condicao-pagamento" element={<CondicaoPagamento />} />
            <Route path="/produto" element={<Produtos />} />
            <Route path="/banco" element={<Banco />} />
            <Route path="/transportadora" element={<ListaTransportadoras />} />
            
            {/* Vendas */}
            <Route path="/Cliente" element={<Cliente />} />
            <Route path="/VendedorRepresentante" element={<VendedorRepresentante />} />
            <Route path="/ListaPropostas" element={<ListaPropostas />} />
            <Route path="/PropostaFornecimento" element={<PropostaFornecimento />} />
            <Route path="/PropostaFornecimento/:id" element={<PropostaFornecimento />} />
            <Route path="/OrdemFornecimento" element={<ListaOrdens />} />
            <Route path="/OrdemFornecimento/:id" element={<OrdemFornecimento />} />

            {/* Compras */}
            <Route path="/Fornecedor" element={<Fornecedores />} />
            <Route path="/lista-pedido-compra" element={<ListaPedidosCompra />} />
            <Route path="/PedidoCompra" element={<PedidoCompra />} />
            <Route path="/PedidoCompra/:id" element={<PedidoCompra />} />


            <Route path="/Relatorio" element={<Relatorios />} />




            {/* 
            <Route path="/vendedor" element={<Vendedor />} />
            <Route path="/proposta" element={<Proposta />} />
            <Route path="/ordem" element={<Ordem />} /> */}
            
            {/* Compras */}
            {/* <Route path="/fornecedor" element={<Fornecedor />} />
            <Route path="/pedido-compra" element={<PedidoCompra />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;