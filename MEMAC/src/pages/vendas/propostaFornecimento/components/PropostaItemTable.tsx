
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
export interface PropostaItem {
  id: string;
  codEngeman: string;
  referencia: string;
  un: string;
  descricao: string;
  qtd: number;
  custoLiq: number;
  ump: number;
  ipi: number;
  icms: number;
  unitario: number;
  desc: number;
  total: number;
  classFiscal: string;
  prazoEntrega: string;
}

// Sample database of items that can be searched by codEngeman
export const itemsDatabase: PropostaItem[] = [
  {
    id: "01",
    codEngeman: "ENG001",
    referencia: "REF001",
    un: "PC",
    descricao: "Válvula de Controle 2\"",
    qtd: 0,
    custoLiq: 500,
    ump: 5,
    ipi: 10,
    icms: 18,
    unitario: 600,
    desc: 0,
    total: 0,
    classFiscal: "8481.80.99",
    prazoEntrega: "30 dias"
  },
  {
    id: "02",
    codEngeman: "ENG002",
    referencia: "REF002",
    un: "M",
    descricao: "Tubo de Aço Inox 316L DN 50",
    qtd: 0,
    custoLiq: 120,
    ump: 3,
    ipi: 5,
    icms: 12,
    unitario: 150,
    desc: 0,
    total: 0,
    classFiscal: "7304.41.00",
    prazoEntrega: "15 dias"
  },
  {
    id: "03",
    codEngeman: "ENG003",
    referencia: "REF003",
    un: "UN",
    descricao: "Bomba Centrífuga 5HP",
    qtd: 0,
    custoLiq: 2500,
    ump: 8,
    ipi: 12,
    icms: 18,
    unitario: 3200,
    desc: 0,
    total: 0,
    classFiscal: "8413.70.90",
    prazoEntrega: "45 dias"
  },
  {
    id: "04",
    codEngeman: "ENG004",
    referencia: "REF004",
    un: "KG",
    descricao: "Resina Epóxi Industrial",
    qtd: 0,
    custoLiq: 45,
    ump: 2,
    ipi: 8,
    icms: 12,
    unitario: 55,
    desc: 0,
    total: 0,
    classFiscal: "3907.30.22",
    prazoEntrega: "10 dias"
  },
  {
    id: "05",
    codEngeman: "ENG005",
    referencia: "REF005",
    un: "CJ",
    descricao: "Kit de Vedação para Válvula",
    qtd: 0,
    custoLiq: 80,
    ump: 3,
    ipi: 5,
    icms: 18,
    unitario: 95,
    desc: 0,
    total: 0,
    classFiscal: "4016.93.00",
    prazoEntrega: "7 dias"
  },
  {
    id: "06",
    codEngeman: "ENG006",
    referencia: "REF006",
    un: "PC",
    descricao: "Flange de Aço Carbono 3\"",
    qtd: 0,
    custoLiq: 65,
    ump: 4,
    ipi: 8,
    icms: 18,
    unitario: 79,
    desc: 0,
    total: 0,
    classFiscal: "7307.91.00",
    prazoEntrega: "20 dias"
  },
  {
    id: "07",
    codEngeman: "ENG007",
    referencia: "REF007",
    un: "LT",
    descricao: "Óleo Lubrificante Industrial",
    qtd: 0,
    custoLiq: 35,
    ump: 3,
    ipi: 5,
    icms: 18,
    unitario: 42,
    desc: 0,
    total: 0,
    classFiscal: "2710.19.91",
    prazoEntrega: "5 dias"
  },
  {
    id: "08",
    codEngeman: "ENG008",
    referencia: "REF008",
    un: "MT",
    descricao: "Cabo Elétrico Blindado 4x2.5mm²",
    qtd: 0,
    custoLiq: 12,
    ump: 2,
    ipi: 5,
    icms: 18,
    unitario: 15,
    desc: 0,
    total: 0,
    classFiscal: "8544.49.00",
    prazoEntrega: "10 dias"
  },
  {
    id: "09",
    codEngeman: "ENG009",
    referencia: "REF009",
    un: "CJ",
    descricao: "Kit Manutenção Bomba Dosadora",
    qtd: 0,
    custoLiq: 240,
    ump: 5,
    ipi: 10,
    icms: 18,
    unitario: 280,
    desc: 0,
    total: 0,
    classFiscal: "8413.91.90",
    prazoEntrega: "15 dias"
  },
  {
    id: "10",
    codEngeman: "ENG010",
    referencia: "REF010",
    un: "PC",
    descricao: "Válvula Solenóide 1\"",
    qtd: 0,
    custoLiq: 185,
    ump: 4,
    ipi: 8,
    icms: 18,
    unitario: 215,
    desc: 0,
    total: 0,
    classFiscal: "8481.80.99",
    prazoEntrega: "12 dias"
  }
];

interface PropostaItemTableProps {
  items: PropostaItem[];
  setItems: React.Dispatch<React.SetStateAction<PropostaItem[]>>;
}

export const PropostaItemTable: React.FC<PropostaItemTableProps> = ({ items, setItems }) => {
  const [searchCode, setSearchCode] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PropostaItem[]>([]);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);

  const searchItem = (code: string) => {
    if (!code.trim()) {
      setSearchResults([]);
      return;
    }

    const results = itemsDatabase.filter(item => 
      item.codEngeman.toLowerCase().includes(code.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const selectItem = (selectedItem: PropostaItem, id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { 
          ...item,
          codEngeman: selectedItem.codEngeman,
          descricao: selectedItem.descricao,
          un: selectedItem.un,
          unitario: selectedItem.unitario,
          custoLiq: selectedItem.custoLiq,
          ump: selectedItem.ump,
          ipi: selectedItem.ipi,
          icms: selectedItem.icms,
          classFiscal: selectedItem.classFiscal,
          prazoEntrega: selectedItem.prazoEntrega,
          // Recalculate total
          total: item.qtd * selectedItem.unitario
        } : item
      )
    );
    
    setSearchCode("");
    setSearchResults([]);
  };

  const handleInputChange = (id: string, field: keyof PropostaItem, value: string | number) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate total when quantity or unitario changes
          if (field === 'qtd' || field === 'unitario') {
            const qty = field === 'qtd' ? Number(value) : item.qtd;
            const price = field === 'unitario' ? Number(value) : item.unitario;
            updatedItem.total = qty * price;
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addNewRow = () => {
    // If items array is empty, start with ID 01
    const newId = items.length > 0 
      ? (parseInt(items[items.length - 1].id) + 1).toString().padStart(2, '0')
      : "01";
      
    setItems([...items, {
      id: newId,
      codEngeman: '',
      referencia: '',
      un: '',
      descricao: '',
      qtd: 0,
      custoLiq: 0,
      ump: 0,
      ipi: 0,
      icms: 0,
      unitario: 0,
      desc: 0,
      total: 0,
      classFiscal: '',
      prazoEntrega: ''
    }]);
  };

  const handleCodeEngemanChange = (id: string, value: string) => {
    // Update the input value
    handleInputChange(id, 'codEngeman', value);
    // Search for matching items
    searchItem(value);
    setCurrentEditingId(id);
  };

  return (
    <div className="overflow-x-auto">
      <Table className="border">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="font-bold w-12 text-center">It.</TableHead>
            <TableHead className="font-bold">Cód.Engeman</TableHead>
            <TableHead className="font-bold">Referência</TableHead>
            <TableHead className="font-bold w-14">Un.</TableHead>
            <TableHead className="font-bold">Descrição(Material/Serviço)</TableHead>
            <TableHead className="font-bold w-16 text-right">Qtd</TableHead>
            <TableHead className="font-bold w-20 text-right">(R$) Custo Liq.</TableHead>
            <TableHead className="font-bold w-20 text-right">(IMUP)</TableHead>
            <TableHead className="font-bold w-16 text-right">% IPI</TableHead>
            <TableHead className="font-bold w-16 text-right">% ICMS</TableHead>
            <TableHead className="font-bold w-20 text-right">(R$) Unitário</TableHead>
            <TableHead className="font-bold w-20 text-right">% Desc.</TableHead>
            <TableHead className="font-bold w-20 text-right">(R$) Total</TableHead>
            <TableHead className="font-bold">Class.Fiscal</TableHead>
            <TableHead className="font-bold">Prazo Entrega</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className={item.id === '01' ? 'bg-gray-50' : ''}>
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell>
                <div className="relative">
                  <div className="flex items-center">
                    <Input 
                      type="text" 
                      value={item.codEngeman} 
                      onChange={(e) => handleCodeEngemanChange(item.id, e.target.value)}
                      className="p-1 h-8"
                      onClick={() => {
                        setCurrentEditingId(item.id);
                        searchItem(item.codEngeman);
                      }}
                    />
                  </div>
                  
                  {searchResults.length > 0 && currentEditingId === item.id && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {searchResults.map((result) => (
                          <li
                            key={result.id}
                            onClick={() => selectItem(result, item.id)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
                          >
                            <span>{result.codEngeman}</span>
                            <span className="text-sm text-gray-500 truncate max-w-[150px]">
                              {result.descricao}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Input 
                  type="text" 
                  value={item.referencia} 
                  onChange={(e) => handleInputChange(item.id, 'referencia', e.target.value)}
                  className="p-1 h-8"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="text" 
                  value={item.un} 
                  onChange={(e) => handleInputChange(item.id, 'un', e.target.value)}
                  className="p-1 h-8"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="text" 
                  value={item.descricao} 
                  onChange={(e) => handleInputChange(item.id, 'descricao', e.target.value)}
                  className="p-1 h-8"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.qtd} 
                  onChange={(e) => handleInputChange(item.id, 'qtd', parseFloat(e.target.value) || 0)}
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.custoLiq} 
                  onChange={(e) => handleInputChange(item.id, 'custoLiq', parseFloat(e.target.value) || 0)}
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.ump} 
                  onChange={(e) => handleInputChange(item.id, 'ump', parseFloat(e.target.value) || 0)}
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.ipi} 
                  onChange={(e) => handleInputChange(item.id, 'ipi', parseFloat(e.target.value) || 0)}
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.icms} 
                  onChange={(e) => handleInputChange(item.id, 'icms', parseFloat(e.target.value) || 0)}
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.unitario} 
                  onChange={(e) => handleInputChange(item.id, 'unitario', parseFloat(e.target.value) || 0)}
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.desc} 
                  onChange={(e) => handleInputChange(item.id, 'desc', parseFloat(e.target.value) || 0)}
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  value={item.total || item.qtd * item.unitario} 
                  readOnly
                  className="p-1 h-8 text-right"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="text" 
                  value={item.classFiscal} 
                  onChange={(e) => handleInputChange(item.id, 'classFiscal', e.target.value)}
                  className="p-1 h-8"
                />
              </TableCell>
              <TableCell>
                <Input 
                  type="text" 
                  value={item.prazoEntrega} 
                  onChange={(e) => handleInputChange(item.id, 'prazoEntrega', e.target.value)}
                  className="p-1 h-8"
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-gray-50 hover:bg-gray-100 cursor-pointer" onClick={addNewRow}>
            <TableCell colSpan={15} className="text-center text-gray-500">
              + Clique para adicionar item
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
