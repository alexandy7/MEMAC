import React from "react";
import LabeledInput from "@/components/LabeledInput";

interface Values {
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
}

interface Props {
  index: number;
  values: Values;
  onChange: (index: number, key: keyof Values, value: string) => void;
}
export default function ContactFields({ index, values, onChange }: Props) {
  return (
    <div className="border rounded-lg p-3 bg-muted/40 grid gap-2">
      <div className="font-medium text-sm text-muted-foreground mb-1">Contato {index + 1}</div>
      <LabeledInput label="Nome" name={`nome${index}`} value={values.nome} onChange={e => onChange(index, "nome", e.target.value)} placeholder="Nome" />
      <LabeledInput label="Cargo" name={`cargo${index}`} value={values.cargo} onChange={e => onChange(index, "cargo", e.target.value)} placeholder="Cargo/função" />
      <LabeledInput label="Telefone" name={`telefone${index}`} value={values.telefone} onChange={e => onChange(index, "telefone", e.target.value)} placeholder="Telefone" />
      <LabeledInput label="E-mail" name={`email${index}`} value={values.email} onChange={e => onChange(index, "email", e.target.value)} placeholder="E-mail" />
    </div>
  );
}
