import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input, Textarea } from "../../kit/Field.jsx";

export const AddProduct = () => {
  const { post } = useContext(AtlantContext);

  const [form, setForm] = useState({
    name: "Титановый криогенный теплообменник ТК-1400",
    imageUrl: "https://waves-manufacturing.internal/assets/specs/tk-1400.png",
    description: "Теплообменник спиральный для СПГ-терминалов. Испытательное давление 12,5 МПа. Сталь AISI 316L / 08Х18Н10Т.",
    regions: "RU-LED, EU-ROTTERDAM, DE-HAMBURG",
    minVolume: "10",
    maxVolume: "150",
    serialBatch: "BATCH-2026-TK-088",
    standard: "ISO 9001:2015 / ГОСТ 34347-2017",
  });

  const [submitting, setSubmitting] = useState(false);

  const fillSample = () => {
    setForm({
      name: "Клапан регулирующий с микропроцессорным позиционером DN150",
      imageUrl: "https://waves-manufacturing.internal/assets/specs/valve-dn150.png",
      description: "Прецизионный запорно-регулирующий узел для агрессивных экспортных сред. Взрывозащита 1Ex d IIC T6.",
      regions: "Балтика, Северное море, АТР",
      minVolume: "25",
      maxVolume: "300",
      serialBatch: `BATCH-2026-VALVE-${Date.now().toString().slice(-4)}`,
      standard: "ISO 9001:2015 / CE Directive",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "addProduct" },
        { key: "name", type: "string", value: form.name },
        { key: "imageUrl", type: "string", value: form.imageUrl },
        { key: "description", type: "string", value: form.description },
        { key: "regions", type: "string", value: form.regions },
        { key: "minVolume", type: "string", value: form.minVolume },
        { key: "maxVolume", type: "string", value: form.maxVolume },
        { key: "serialBatch", type: "string", value: form.serialBatch },
        { key: "standard", type: "string", value: form.standard },
        { key: "quantity", type: "integer", value: Number(form.minVolume) || 50 },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card card-lg mb-4">
      <div className="flex justify-between items-center flex-wrap gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: addProduct</span>
          <h3 className="text-lg fw-700">{typograph("Регистрация экспортной партии готовой продукции")}</h3>
        </div>
        <button type="button" onClick={fillSample} className="btn btn-secondary btn-sm">
          {typograph("Заполнить образец ISO")}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Наименование продукта / изделия" full>
            {(fp) => (
              <Input {...fp} type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            )}
          </Field>

          <Field label="Номер серийной партии" hint="serialBatch" mono>
            {(fp) => (
              <Input {...fp} type="text" required className="mono-data" value={form.serialBatch}
                onChange={(e) => setForm({ ...form, serialBatch: e.target.value })} />
            )}
          </Field>

          <Field label="Стандарт качества и сертификация">
            {(fp) => (
              <Input {...fp} type="text" value={form.standard}
                onChange={(e) => setForm({ ...form, standard: e.target.value })} />
            )}
          </Field>

          <Field label="Регионы экспорта и транзитные порты">
            {(fp) => (
              <Input {...fp} type="text" value={form.regions}
                onChange={(e) => setForm({ ...form, regions: e.target.value })} />
            )}
          </Field>

          <Field label="Минимальный объём партии, шт.">
            {(fp) => (
              <Input {...fp} type="number" className="mono-data" value={form.minVolume}
                onChange={(e) => setForm({ ...form, minVolume: e.target.value })} />
            )}
          </Field>

          <Field label="Максимальный объём партии, шт.">
            {(fp) => (
              <Input {...fp} type="number" className="mono-data" value={form.maxVolume}
                onChange={(e) => setForm({ ...form, maxVolume: e.target.value })} />
            )}
          </Field>

          <Field label="Технические характеристики и спецификация сплава" full>
            {(fp) => (
              <Textarea {...fp} rows={2} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Зарегистрировать партию продукции")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
