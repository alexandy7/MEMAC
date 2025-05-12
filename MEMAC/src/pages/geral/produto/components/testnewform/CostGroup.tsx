import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CostGroupProps {
  label: string;
  state: { valor?: string; iss?: string; ipi?: string; icms?: string };
  onChange: (field: string, val: string) => void;
}

export function CostGroup({ label, state, onChange }: CostGroupProps) {
  const [showImpostos, setShowImpostos] = useState(false);

  return (
    <div className="border rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Label className="mb-0">($) {label}</Label>
        <Input
          type="number"
          className="w-28"
          value={state.valor || ""}
          onChange={e => onChange("valor", e.target.value)}
          min="0"
          step="0.01"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setShowImpostos(s => !s)}
          title={showImpostos ? "Ocultar impostos" : "Adicionar impostos"}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {showImpostos && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div>
            <Label>% ISS</Label>
            <Input
              type="number"
              value={state.iss || ""}
              onChange={e => onChange("iss", e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>% IPI</Label>
            <Input
              type="number"
              value={state.ipi || ""}
              onChange={e => onChange("ipi", e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <div>
            <Label>% ICMS</Label>
            <Input
              type="number"
              value={state.icms || ""}
              onChange={e => onChange("icms", e.target.value)}
              min="0"
              max="100"
            />
          </div>
        </div>
      )}
    </div>
  );
}