import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input, Textarea } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

const TYPE_OPTIONS = [
  { value: "SUPPLY", label: "Supply — поставка готовой продукции" },
  { value: "PRODUCTION", label: "Production — производственный заказ" },
];

export const CreateBid = () => {
  const { post, sender, products } = useContext(AtlantContext);

  const [form, setForm] = useState({
    type: "SUPPLY",
    targetAddress: "3PMfgWavesExpMain2026RU",
    productName: "Криогенный запорный клапан DN200 PN40",
    volume: "120",
    deliveryDate: "2026-12-15",
    techReqs: "Сертификация ISO 9001:2015, неразрушающий контроль швов, хладостойкость до -196 °C.",
    deliveryCond: "CIF Rotterdam (Incoterms 2020)",
    address: "Rotterdam Maasvlakte Oil & Gas Terminal",
    paymentTerms: "100% Эскроу в Waves смарт-контракте при подтверждении приемки",
    requestHash: "b58_req_998124018240192840192840124",
    productId: products[0]?.id || "PRODS_VALVE_CRYO_DN200_01",
    totalEscrow: "145 000 WAVES",
  });

  const [submitting, setSubmitting] = useState(false);

  const fillSample = () => {
    setForm({
      type: "PRODUCTION",
      targetAddress: "3PMfgWavesExpMain2026RU",
      productName: "Модуль ЧПУ прецизионного управления 5-осевыми центрами",
      volume: "45",
      deliveryDate: "2026-12-30",
      techReqs: "CE Directive 2006/42/EC, класс защиты оболочки IP68, экранирование интерфейсов.",
      deliveryCond: "DAP Hamburg Container Terminal",
      address: "Hamburg Industrial Logistics Park, Gate 4",
      paymentTerms: "Эскроу депонирование с этапной оплатой 30/70",
      requestHash: `b58_req_${Date.now().toString().slice(-8)}`,
      productId: "PRODS_CNC_TURBO_CONTROLLER_02",
      totalEscrow: "98 500 WAVES",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "createBid" },
        { key: "type", type: "string", value: form.type },
        { key: "targetAddress", type: "string", value: form.targetAddress },
        { key: "productName", type: "string", value: form.productName },
        { key: "volume", type: "string", value: form.volume },
        { key: "deliveryDate", type: "string", value: form.deliveryDate },
        { key: "techReqs", type: "string", value: form.techReqs },
        { key: "deliveryCond", type: "string", value: form.deliveryCond },
        { key: "address", type: "string", value: form.address },
        { key: "paymentTerms", type: "string", value: form.paymentTerms },
        { key: "requestHash", type: "string", value: form.requestHash },
        { key: "productId", type: "string", value: form.productId },
        { key: "totalEscrow", type: "string", value: form.totalEscrow },
        { key: "quantity", type: "integer", value: Number(form.volume) || 100 },
        { key: "title", type: "string", value: `Экспортная поставка: ${form.productName}` },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card card-lg mb-4">
      <div className="flex justify-between items-center flex-wrap gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: createBid</span>
          <h3 className="text-lg fw-700">{typograph("Формирование внешнеторговой экспортной заявки")}</h3>
        </div>
        <button type="button" onClick={fillSample} className="btn btn-secondary btn-sm">
          {typograph("Заполнить образец Инкотермс")}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Тип заявки" hint="type">
            {(fp) => <Select {...fp} value={form.type} options={TYPE_OPTIONS} onChange={(v) => setForm({ ...form, type: v })} />}
          </Field>

          <Field label="Адрес поставщика / завода" hint="targetAddress" mono full>
            {(fp) => (
              <Input {...fp} type="text" required className="mono-data" value={form.targetAddress}
                onChange={(e) => setForm({ ...form, targetAddress: e.target.value })} />
            )}
          </Field>

          <Field label="Наименование продукта">
            {(fp) => (
              <Input {...fp} type="text" required value={form.productName}
                onChange={(e) => setForm({ ...form, productName: e.target.value })} />
            )}
          </Field>

          <Field label="Объём, шт.">
            {(fp) => (
              <Input {...fp} type="number" className="mono-data" value={form.volume}
                onChange={(e) => setForm({ ...form, volume: e.target.value })} />
            )}
          </Field>

          <Field label="Срок поставки">
            {(fp) => (
              <Input {...fp} type="date" className="mono-data" value={form.deliveryDate}
                onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} />
            )}
          </Field>

          <Field label="Условия поставки Инкотермс" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={form.deliveryCond}
                onChange={(e) => setForm({ ...form, deliveryCond: e.target.value })} />
            )}
          </Field>

          <Field label="Сумма эскроу-обеспечения, WAVES" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={form.totalEscrow}
                onChange={(e) => setForm({ ...form, totalEscrow: e.target.value })} />
            )}
          </Field>

          <Field label="Пункт назначения и таможенный терминал" full>
            {(fp) => (
              <Input {...fp} type="text" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })} />
            )}
          </Field>

          <Field label="Технические требования и приёмка ISO 9001" full>
            {(fp) => (
              <Textarea {...fp} rows={2} value={form.techReqs}
                onChange={(e) => setForm({ ...form, techReqs: e.target.value })} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Создать экспортную заявку")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBid;
