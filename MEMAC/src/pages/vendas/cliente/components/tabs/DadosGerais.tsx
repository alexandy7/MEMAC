
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cliente } from "@/types/Cliente";

type DadosGeraisProps = {
  form: UseFormReturn<Cliente>;
};

export const DadosGerais = ({ form }: DadosGeraisProps) => {
  const { register } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <div className="space-y-2">
          <Label htmlFor="codigo">Código</Label>
          <Input {...register("codigo")} id="codigo" placeholder="000000" />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input {...register("cnpj")} id="cnpj" placeholder="00.000.000/0000-00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="razaoSocial">Razão Social</Label>
          <Input {...register("razaoSocial")} id="razaoSocial" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomeReduzido">Nome Reduzido</Label>
          <Input {...register("nomeReduzido")} id="nomeReduzido" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
          <Input {...register("inscricaoEstadual")} id="inscricaoEstadual" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
          <Input {...register("inscricaoMunicipal")} id="inscricaoMunicipal" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="enderecoPrincipal">Endereço Principal</Label>
          <Input {...register("enderecoPrincipal")} id="enderecoPrincipal" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input {...register("bairro")} id="bairro" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="municipio">Município</Label>
          <Input {...register("municipio")} id="municipio" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="uf">UF</Label>
          <Input {...register("uf")} id="uf" maxLength={2} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input {...register("cep")} id="cep" placeholder="00000-000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input {...register("telefone")} id="telefone" />
        </div>
      </div>
    </div>
  );
};
