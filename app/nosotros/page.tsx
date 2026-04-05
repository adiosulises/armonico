import Image from "next/image"

export default function Nosotros() {
    return (
        <div className="flex justify-center items-center">
            <div className="md:py-30 m-2 max-w-120 flex flex-col gap-4">
                <Image
                    src={'/hero-imgs/compressed/14.webp'}
                    alt="venue"
                    width={1920}
                    height={1080}
                />
                <p>sobre <span className="text-[#C91E1F]">armonico</span></p>
                <p><span className="text-[#C91E1F]">Armónico</span> Es un centro cultural independiente que funciona como espacio de creación, encuentro y colaboración artística. </p>
                <p>Su objetivo no es únicamente exhibir arte, sino activar la comunidad, promover el diálogo y sostener procesos creativos a largo plazo.</p>
                <p>Se construye a partir de un modelo de gestión cultural donde la libertad creativa y la organización conviven, permitiendo que los procesos artísticos encuentren un soporte claro, sostenible y transparente sin perder su esencia</p>
                <Image
                    src={'/hero-imgs/compressed/2.webp'}
                    alt="venue"
                    width={1920}
                    height={1080}
                />
                <p>mision</p>
                <p>Cuidar, sostener y proyectar la comunidad artística que da vida a Armónico, creando un espacio donde los procesos creativos encuentren continuidad, diálogo y soporte dentro de una estructura consciente y sostenible.</p>
                <Image
                    src={'/tuba.png'}
                    alt="venue"
                    width={1920}
                    height={1080}
                />
                <p>vision</p>
                <p>Consolidarse como el principal centro cultural independiente de referencia en Chihuahua, reconocido por su impacto artístico, su comunidad activa y su modelo de gestión replicable en el norte del país</p>
                <Image
                    src={'/hero-imgs/compressed/10.webp'}
                    alt="venue"
                    width={1920}
                    height={1080}
                />
            </div>
        </div>
    )
}