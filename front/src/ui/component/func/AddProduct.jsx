import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

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
    <div className="mfg-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: addProduct</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Регистрация экспортной партии готовой продукции (PRODS)")}
          </h3>
        </div>
        <button
          type="button"
          onClick={fillSample}
          className="mfg-btn-secondary py-1 px-3"
          style={{ minHeight: 34, fontSize: "0.75rem" }}
        >
          Заполнить образец ISO
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <label className="mfg-label mono-data">НАИМЕНОВАНИЕ ПРОДУКТА / ИЗДЕЛИЯ</label>
            <input
              type="text"
              required
              className="mfg-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">НОМЕР СЕРИЙНОЙ ПАРТИИ (BATCH ID)</label>
            <input
              type="text"
              required
              className="mfg-input mono-data"
              value={form.serialBatch}
              onChange={(e) => setForm({ ...form, serialBatch: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">СТАНДАРТ КАЧЕСТВА И СЕРТИФИКАЦИЯ</label>
            <input
              type="text"
              className="mfg-input"
              value={form.standard}
              onChange={(e) => setForm({ ...form, standard: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">РЕГИОНЫ ЭКСПОРТА И ТРАНЗИТНЫЕ ПОРТЫ</label>
            <input
              type="text"
              className="mfg-input"
              value={form.regions}
              onChange={(e) => setForm({ ...form, regions: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">МИНИМАЛЬНЫЙ ОБЪЕМ ПАРТИИ (ШТ.)</label>
            <input
              type="number"
              className="mfg-input mono-data"
              value={form.minVolume}
              onChange={(e) => setForm({ ...form, minVolume: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">МАКСИМАЛЬНЫЙ ОБЪЕМ ПАРТИИ (ШТ.)</label>
            <input
              type="number"
              className="mfg-input mono-data"
              value={form.maxVolume}
              onChange={(e) => setForm({ ...form, maxVolume: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="mfg-label mono-data">ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ И СПЕЦИФИКАЦИЯ СПЛАВА</label>
            <textarea
              rows={2}
              className="mfg-input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Зарегистрировать партию продукции")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
