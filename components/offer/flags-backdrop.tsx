// Varal de bandeirinhas decorativas (Colombia, Mexico, Chile, Uruguai,
// Republica Dominicana e Peru) penduradas no topo da hero.
// Apenas decoracao de fundo: nao interfere no conteudo nem nas imagens dos doces.

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
  rotate: string
  drop: string
}

const flags: FlagItem[] = [
  { name: 'Colombia', Flag: ColombiaFlag, rotate: '-6deg', drop: 'mt-1' },
  { name: 'Mexico', Flag: MexicoFlag, rotate: '4deg', drop: 'mt-3' },
  { name: 'Chile', Flag: ChileFlag, rotate: '-4deg', drop: 'mt-0.5' },
  { name: 'Uruguay', Flag: UruguayFlag, rotate: '5deg', drop: 'mt-3' },
  { name: 'Republica Dominicana', Flag: DominicanFlag, rotate: '-5deg', drop: 'mt-1' },
  { name: 'Peru', Flag: PeruFlag, rotate: '6deg', drop: 'mt-3' },
]

export function FlagsBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
    >
      {/* Cordinha do varal */}
      <div className="absolute left-0 right-0 top-6 h-px bg-foreground/25 sm:top-8" />

      {/* Bandeirinhas penduradas */}
      <div className="flex items-start justify-center gap-3 px-6 pt-6 sm:gap-6 sm:pt-8">
        {flags.map(({ name, Flag, rotate, drop }) => (
          <div key={name} className={`flex flex-col items-center ${drop}`}>
            {/* nozinho */}
            <div className="h-2 w-2 rounded-full bg-foreground/40" />
            <div
              className="mt-0.5 h-10 w-16 origin-top overflow-hidden rounded-sm shadow-md ring-1 ring-black/10 sm:h-14 sm:w-24"
              style={{ transform: `rotate(${rotate})` }}
              title={name}
            >
              <Flag />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
