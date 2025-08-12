import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

const faqs = [
  {
    question: "Matras bel og'riqlari uchun foydali emasmI?",
    answers: [
      "7-zonali ortopedik qo'llab-quvvatlash umurtqa pog'onasi uchun",
      "Memory foam qatlami tananing shaklini eslab qoladi",
      "To'g'ri holat uyqu davomida umurtqa pog'onasi tekis turadi",
      "Bosimni taqsimlash og'riqli nuqtalarga yumshoqlik",
    ],
  },
  {
    question: "Matras qattiq yoki yumshoqqmi?",
    answers: [
      "Universal qattiqlik 85% odamlar uchun mos",
      "Adaptiv material og'irlikka qarab moslashadi",
      "Yon, orqa, qorincha uxlovchilar barchasi uchun qulay",
      "Bolalar va kattalar yoshlarga bog'liq emas",
    ],
  },
  {
    question: "Matras issiq bo'lib qoladi, terlashga olib keladimi?",
    answers: [
      "Gel-infused memory foam sovutish effekti",
      "Bambuk tolali qoplama tabiiy sovutish",
      "Yozda salqin, qishda iliq avtomatik moslashish",
      "Terlash muammosi yo'q quruq va qulay uyqu",
    ],
  },
  {
    question: "Matras qancha muddat xizmat qiladi?",
    answers: [
      "15 yil to'liq kafolat shakli o'zgarmaydi",
      "Cho'kmagisligi kafolati yuqori sifatli materiallar",
      "Antibakterial ta'sir butun muddat davomida",
      "Ortopedik xususiyatlari saqlanadi",
    ],
  },
  {
    question: "Allergiyam bor, matras xavfli emasmI?",
    answers: [
      "Ekologik toza materiallar kimyoviy moddalar yo'q",
      "Antibakterial qoplama mikroblar va bakteriyalarni yo'q qiladi",
      "Nafas olish qiyin bo'lmaydi havo aylanishi mukammal",
      "Chang kenesi qarshi maxsus himoya qatlami",
    ],
  },
]

const InterestingQuestions = () => {
    return (
        <section className=" text-white py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Sizni qiziqtirgan savollar</h2>
            <p className="text-sm text-white/70">
              EcoSpine matraslar haqida eng muhim savollar va javoblar
            </p>
          </div>
  
          {/* FAQ Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="bg-[#11182C] border border-white/10 rounded-xl">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold mb-4">{faq.question}</h3>
                  <ul className="space-y-3 text-sm text-white/80">
                    {faq.answers.map((ans, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-price-primary mt-1" />
                        <span dangerouslySetInnerHTML={{ __html: highlightBold(ans) }} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
  
            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-[#1D2A60] to-[#0F1A3D] col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col justify-between overflow-hidden relative border-0">
              <CardContent className="p-5 z-10 relative">
                <h3 className="text-xl font-bold mb-2">EcoSpine</h3>
                <p className="mb-6 text-sm text-white/80">Hozirroq bog'laning va chegirmalarga ega bo'ling</p>
                <button className="bg-white text-[#1D2A60] font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-100 transition">
                  📞 Qo'ng'iroq qilish
                </button>
              </CardContent>
              <img
                src="/mattress-stack.png"
                alt="Mattress Stack"
                width={350}
                height={250}
                className="absolute bottom-0 right-0 opacity-90 z-0"
              />
            </Card>
          </div>
        </div>
      </section>
    )
}

export default InterestingQuestions;

function highlightBold(text: string) {
    const [bold, ...rest] = text.split(" ")
    return `<strong>${bold}</strong> ${rest.join(" ")}`
  }