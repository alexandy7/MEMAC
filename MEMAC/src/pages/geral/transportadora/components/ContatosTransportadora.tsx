import React from "react";
import LabeledInput from "../../../../components/LabeledInput";

interface ContactValues {
  nome: string;
  cargo: string;
  telefone: string;
}

interface Props {
  index: number;
  values: ContactValues;
  onChange: (index: number, key: keyof ContactValues, value: string) => void;
}

export default function CarrierContactFields({ index, values, onChange }: Props) {
  return (
    <div className="border rounded-lg p-3 bg-muted/40 grid gap-2">
      <div className="font-medium text-sm text-muted-foreground mb-1">Contato {index + 1}</div>
      <LabeledInput label="Nome Contato" name={`contato_nome${index}`} value={values.nome} onChange={e => onChange(index, "nome", e.target.value)} placeholder="Nome" />
      <LabeledInput label="Cargo" name={`contato_cargo${index}`} value={values.cargo} onChange={e => onChange(index, "cargo", e.target.value)} placeholder="Cargo/função" />
      <LabeledInput label="Telefone N°" name={`contato_telefone${index}`} value={values.telefone} onChange={e => onChange(index, "telefone", e.target.value)} placeholder="Telefone" />
    </div>
  );
}
