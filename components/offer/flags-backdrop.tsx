// Bandeiras decorativas simplificadas em CSS, usadas apenas como fundo da hero.
// Nao interfere no conteudo nem nas imagens dos doces.

function ColombiaFlag() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="h-1/2 bg-[#FCD116]" />
      <div className="h-1/4 bg-[#003893]" />
      <div className="h-1/4 bg-[#CE1126]" />
    </div>
  )
}

function MexicoFlag() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 bg-[#006847]" />
      <div className="w-1/3 bg-white" />
      <div className="w-1/3 bg-[#CE1126]" />
    </div>
  )
}

function PeruFlag() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="w-1/3 bg-[#D91023]" />
      <div className="w-1/3 bg-white" />
      <div className="w-1/3 bg-[#D91023]" />
    </div>
  )
}

function ChileFlag() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-white" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#D52B1E]" />
      <div className="absolute left-0 top-0 flex h-1/2 w-1/3 items-center justify-center bg-[#0039A6]">
        <span className="text-white" style={{ fontSize: '0.6em', lineHeight: 1 }}>
          ★
        </span>
      </div>
    </div>
  )
}

function UruguayFlag() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <div className="flex h-full w-full flex-col">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={i % 2 === 0 ? 'flex-1 bg-[#0038A8]' : 'flex-1 bg-white'} />
        ))}
      </div>
      <div className="absolute left-0 top-0 flex h-[55%] w-[45%] items-center justify-center bg-white">
        <span className="text-[#F5D000]" style={{ fontSize: '0.7em', lineHeight: 1 }}>
          ☀
        </span>
      </div>
    </div>
  )
}

function DominicanFlag() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="grid h-full w-full grid-cols-2 grid-rows-2">
        <div className="bg-[#002D62]" />
        <div className="bg-[#CE1126]" />
        <div className="bg-[#CE1126]" />
        <div className="bg-[#002D62]" />
      </div>
      <div className="absolute inset-y-0 left-1/2 w-[14%] -translate-x-1/2 bg-white" />
      <div className="absolute inset-x-0 top-1/2 h-[14%] -translate-y-1/2 bg-white" />
    </div>
  )
}

type FlagItem = {
  name: string
  Flag: () => JSX.Element
  className: string
  rotate: string
}

const flags: FlagItem[] = [
  { name: 'Colombia', Flag: ColombiaFlag, className: 'left-[4%] top-[10%] h-16 w-24 sm:h-20 sm:w-32', rotate: '-12deg' },
  { name: 'Mexico', Flag: MexicoFlag, className: 'right-[6%] top-[8%] h-16 w-24 sm:h-20 sm:w-32', rotate: '10deg' },
  { name: 'Peru', Flag: PeruFlag, className: 'left-[10%] top-[46%] h-14 w-20 sm:h-16 sm:w-28', rotate: '8deg' },
  { name: 'Chile', Flag: ChileFlag, className: 'right-[10%] top-[42%] h-16 w-24 sm:h-20 sm:w-32', rotate: '-8deg' },
  { name: 'Uruguay', Flag: UruguayFlag, className: 'left-[6%] bottom-[8%] h-16 w-24 sm:h-20 sm:w-32', rotate: '6deg' },
  { name: 'Republica Dominicana', Flag: DominicanFlag, className: 'right-[5%] bottom-[10%] h-16 w-24 sm:h-20 sm:w-32', rotate: '-10deg' },
]

export function FlagsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {flags.map(({ name, Flag, className, rotate }) => (
        <div
          key={name}
          className={`absolute rounded-lg opacity-20 shadow-lg ring-1 ring-black/5 ${className}`}
          style={{ transform: `rotate(${rotate})` }}
        >
          <div className="h-full w-full overflow-hidden rounded-lg">
            <Flag />
          </div>
        </div>
      ))}
    </div>
  )
}
