import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

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
    <div className="mfg-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: createBid</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Формирование внешнеторговой экспортной заявки (CreateBid)")}
          </h3>
        </div>
        <button
          type="button"
          onClick={fillSample}
          className="mfg-btn-secondary py-1 px-3"
          style={{ minHeight: 34, fontSize: "0.75rem" }}
        >
          Заполнить образец Инкотермс
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">ТИП ЗАЯВКИ (TYPE)</label>
            <select
              className="mfg-input mono-data"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="SUPPLY">SUPPLY (Поставка готовой продукции)</option>
              <option value="PRODUCTION">PRODUCTION (Производственный заказ)</option>
            </select>
          </div>

          <div className="col-12 col-md-8">
            <label className="mfg-label mono-data">АДРЕС ПОСТАВЩИКА / ЗАВОДА (TARGETADDRESS)</label>
            <input
              type="text"
              required
              className="mfg-input mono-data"
              value={form.targetAddress}
              onChange={(e) => setForm({ ...form, targetAddress: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">НАИМЕНОВАНИЕ ПРОДУКТА</label>
            <input
              type="text"
              required
              className="mfg-input"
              value={form.productName}
              onChange={(e) => setForm({ ...form, productName: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="mfg-label mono-data">ОБЪЕМ (ШТ.)</label>
            <input
              type="number"
              className="mfg-input mono-data"
              value={form.volume}
              onChange={(e) => setForm({ ...form, volume: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="mfg-label mono-data">СРОК ПОСТАВКИ</label>
            <input
              type="date"
              className="mfg-input mono-data"
              value={form.deliveryDate}
              onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">УСЛОВИЯ ПОСТАВКИ ИНКОТЕРМС (DELIVERYCOND)</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={form.deliveryCond}
              onChange={(e) => setForm({ ...form, deliveryCond: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">СУММА ЭСКРОУ-ОБЕСПЕЧЕНИЯ (WAVES)</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={form.totalEscrow}
              onChange={(e) => setForm({ ...form, totalEscrow: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="mfg-label mono-data">ПУНКТ НАЗНАЧЕНИЯ И ТАМОЖЕННЫЙ ТЕРМИНАЛ</label>
            <input
              type="text"
              className="mfg-input"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="mfg-label mono-data">ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ И ПРИЕМКА ISO 9001</label>
            <textarea
              rows={2}
              className="mfg-input"
              value={form.techReqs}
              onChange={(e) => setForm({ ...form, techReqs: e.target.value })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Создать экспортную заявку")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBid;
