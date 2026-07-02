'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  BookOpen,
  Calculator,
  Camera,
  Check,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  Gift,
  Heart,
  Home,
  LayoutGrid,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  ShoppingCart,
  Snowflake,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  Utensils,
  X,
} from 'lucide-react'
import {
  categories,
  bonuses,
  fichaByCategory,
  shoppingList,
  sellingTips,
  priceTable,
  postersReady,
  posterPath,
  coverPath,
  coversReady,
  recipeSlug,
  type Recipe,
  type Category,
} from './access-data'

type View = 'inicio' | 'recetas' | 'categorias' | 'compras' | 'tips' | 'precios' | 'bonos' | 'favoritos'

type RecipeCardData = Recipe & {
  categoryId: string
  categoryTitle: string
  image: string
  number: number
}

function keyFor(categoryId: string, name: string) {
  return `${categoryId}::${name}`
}

// Número global de cada receta (01, 02, ...) según el orden de las categorías
const recipeNumbers: Record<string, number> = (() => {
  const map: Record<string, number> = {}
  let n = 0
  for (const cat of categories) {
    for (const r of cat.recipes) {
      n += 1
      map[keyFor(cat.id, r.name)] = n
    }
  }
  return map
})()

function toCardData(cat: Category, r: Recipe): RecipeCardData {
  // Cada receta tiene su propia portada; si aún no existe, usamos la imagen de la categoría.
  const hasCover = coversReady.has(recipeSlug(r.name))
  return {
    ...r,
    categoryId: cat.id,
    categoryTitle: cat.title,
    image: hasCover ? coverPath(r.name) : cat.image,
    number: recipeNumbers[keyFor(cat.id, r.name)],
  }
}

export function AccessDashboard() {
  const [view, setView] = useState<View>('inicio')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const [selected, setSelected] = useState<RecipeCardData | null>(null)
  const [recetasCat, setRecetasCat] = useState<string>('all')

  function goToCategory(catId: string) {
    setRecetasCat(catId)
    setView('recetas')
    setSidebarOpen(false)
  }

  const allRecipes = useMemo<RecipeCardData[]>(
    () => categories.flatMap((cat) => cat.recipes.map((r) => toCardData(cat, r))),
    [],
  )

  const totalRecipes = allRecipes.length
  const favoriteRecipes = allRecipes.filter((r) => favorites[keyFor(r.categoryId, r.name)])

  function toggleFavorite(r: RecipeCardData) {
    setFavorites((prev) => {
      const k = keyFor(r.categoryId, r.name)
      const next = { ...prev }
      if (next[k]) delete next[k]
      else next[k] = true
      return next
    })
  }

  const navItems: { id: View; label: string; icon: typeof Home }[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'recetas', label: 'Recetas', icon: BookOpen },
    { id: 'categorias', label: 'Categorías', icon: LayoutGrid },
    { id: 'compras', label: 'Lista de compras', icon: ShoppingCart },
    { id: 'tips', label: 'Tips para vender', icon: TrendingUp },
    { id: 'precios', label: 'Precios sugeridos', icon: Tag },
    { id: 'bonos', label: 'Bonos', icon: Gift },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
  ]

  return (
    <div className="min-h-screen bg-background lg:flex">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary font-serif text-sm font-black text-primary-foreground">
            DM
          </span>
          <span className="font-serif text-base font-black text-foreground">Dulces da Maria</span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground"
          aria-label="Abrir menú"
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } border-b border-border bg-card px-4 py-5 lg:sticky lg:top-0 lg:block lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r`}
      >
        <div className="mb-6 hidden items-center gap-3 lg:flex">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-primary font-serif text-lg font-black text-primary-foreground">
            DM
          </span>
          <div>
            <p className="font-serif text-lg font-black leading-tight text-foreground">Dulces da Maria</p>
            <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
              Acceso Completo
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = view === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setView(item.id)
                  setSidebarOpen(false)
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground/70 hover:bg-secondary'
                }`}
              >
                <item.icon className="size-5" />
                {item.label}
                {item.id === 'favoritos' && favoriteRecipes.length > 0 && (
                  <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
                    {favoriteRecipes.length}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="mt-8 rounded-2xl border border-border bg-secondary/50 p-4">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-4" />
            <p className="text-sm font-black">150 recetas + 5 bonos</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Todo tu material está desbloqueado. Prepara, vende y gana desde casa.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        {view === 'inicio' && (
          <InicioView
            totalRecipes={totalRecipes}
            onOpenRecipe={setSelected}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSeeAll={() => setView('recetas')}
            onNavigate={(v) => {
              setView(v)
              setSidebarOpen(false)
            }}
          />
        )}

        {view === 'recetas' && (
          <RecetasView
            onOpenRecipe={setSelected}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            initialCat={recetasCat}
          />
        )}

        {view === 'categorias' && <CategoriasView onOpenCategory={goToCategory} />}

        {view === 'compras' && <ComprasView />}

        {view === 'tips' && <TipsView />}

        {view === 'precios' && <PreciosView />}

        {view === 'bonos' && <BonosView />}

        {view === 'favoritos' && (
          <FavoritosView
            recipes={favoriteRecipes}
            onOpenRecipe={setSelected}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onExplore={() => setView('recetas')}
          />
        )}
      </main>

      {selected && (
        <RecipeModal
          recipe={selected}
          isFavorite={!!favorites[keyFor(selected.categoryId, selected.name)]}
          onToggleFavorite={() => toggleFavorite(selected)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

function InicioView({
  totalRecipes,
  onOpenRecipe,
  favorites,
  onToggleFavorite,
  onSeeAll,
  onNavigate,
}: {
  totalRecipes: number
  onOpenRecipe: (r: RecipeCardData) => void
  favorites: Record<string, boolean>
  onToggleFavorite: (r: RecipeCardData) => void
  onSeeAll: () => void
  onNavigate: (v: View) => void
}) {
  const quickCards: { view: View; label: string; desc: string; icon: typeof Home }[] = [
    { view: 'recetas', label: 'Recetas', desc: '150 recetas paso a paso', icon: BookOpen },
    { view: 'categorias', label: 'Categorías', desc: 'Explora por tipo de dulce', icon: LayoutGrid },
    { view: 'compras', label: 'Lista de compras', desc: 'Ingredientes organizados', icon: ShoppingCart },
    { view: 'tips', label: 'Tips para vender', desc: 'Vende más y mejor', icon: TrendingUp },
    { view: 'precios', label: 'Precios sugeridos', desc: 'Cobra el precio correcto', icon: Tag },
    { view: 'bonos', label: 'Bonos', desc: '5 materiales extra', icon: Gift },
  ]
  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-3xl">
        <Image
          src="/dulces/hero.png"
          alt="Dulces brasileños listos para vender"
          width={1200}
          height={480}
          className="h-64 w-full object-cover sm:h-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 sm:p-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
            <Sparkles className="size-4" /> ¡Bienvenida, emprendedora!
          </span>
          <h1 className="max-w-lg font-serif text-3xl font-black leading-tight text-balance text-background sm:text-4xl">
            Empieza a vender tus dulces brasileños hoy
          </h1>
          <p className="max-w-md text-sm text-background/80 sm:text-base">
            {totalRecipes} recetas listas para preparar y vender. Solo elige, prepara y gana.
          </p>
        </div>
      </section>

      {/* Quick access cards */}
      <section aria-label="Accesos rápidos">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {quickCards.map((c) => (
            <button
              key={c.view}
              type="button"
              onClick={() => onNavigate(c.view)}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-transform hover:-translate-y-1"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <c.icon className="size-5" />
              </span>
              <div>
                <p className="font-serif text-base font-black text-foreground">{c.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bonos highlight */}
      <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-secondary/40 p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Gift className="size-6" />
          </span>
          <div>
            <p className="font-serif text-lg font-black text-foreground">Tus 5 bonos están incluidos</p>
            <p className="text-sm text-muted-foreground">
              Menú, lista de compras, calculadora, etiquetas e ideas de combos.
            </p>
          </div>
        </div>
        <a
          href="#bonos"
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
        >
          Ver bonos <ChevronRight className="size-4" />
        </a>
      </section>

      {/* Category rows */}
      {categories.map((cat) => (
        <CategoryRow
          key={cat.id}
          category={cat}
          onOpenRecipe={onOpenRecipe}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onSeeAll={onSeeAll}
        />
      ))}

      <BonosSection />
    </div>
  )
}

function CategoryRow({
  category,
  onOpenRecipe,
  favorites,
  onToggleFavorite,
  onSeeAll,
}: {
  category: Category
  onOpenRecipe: (r: RecipeCardData) => void
  favorites: Record<string, boolean>
  onToggleFavorite: (r: RecipeCardData) => void
  onSeeAll: () => void
}) {
  const cards: RecipeCardData[] = category.recipes.slice(0, 8).map((r) => toCardData(category, r))

  return (
    <section aria-labelledby={`row-${category.id}`}>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 id={`row-${category.id}`} className="font-serif text-xl font-black text-foreground">
            {category.title}
          </h2>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
        <button
          type="button"
          onClick={onSeeAll}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-primary"
        >
          Ver todo <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {cards.map((r) => (
          <div key={r.name} className="w-44 shrink-0 snap-start sm:w-52">
            <RecipeCard
              recipe={r}
              isFavorite={!!favorites[keyFor(r.categoryId, r.name)]}
              onOpen={() => onOpenRecipe(r)}
              onToggleFavorite={() => onToggleFavorite(r)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function RecetasView({
  onOpenRecipe,
  favorites,
  onToggleFavorite,
  initialCat = 'all',
}: {
  onOpenRecipe: (r: RecipeCardData) => void
  favorites: Record<string, boolean>
  onToggleFavorite: (r: RecipeCardData) => void
  initialCat?: string
}) {
  const [activeCat, setActiveCat] = useState<string>(initialCat)

  useEffect(() => {
    setActiveCat(initialCat)
  }, [initialCat])

  const shown = activeCat === 'all' ? categories : categories.filter((c) => c.id === activeCat)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-black text-foreground">Todas las recetas</h1>
        <p className="text-sm text-muted-foreground">Explora las 150 recetas por categoría.</p>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <FilterChip label="Todas" active={activeCat === 'all'} onClick={() => setActiveCat('all')} />
        {categories.map((c) => (
          <FilterChip
            key={c.id}
            label={c.title}
            active={activeCat === c.id}
            onClick={() => setActiveCat(c.id)}
          />
        ))}
      </div>

      {shown.map((cat) => (
        <section key={cat.id} aria-labelledby={`grid-${cat.id}`}>
          <h2 id={`grid-${cat.id}`} className="mb-3 font-serif text-xl font-black text-foreground">
            {cat.title}{' '}
            <span className="text-sm font-bold text-muted-foreground">({cat.recipes.length})</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {cat.recipes.map((r) => {
              const card = toCardData(cat, r)
              return (
                <RecipeCard
                  key={r.name}
                  recipe={card}
                  isFavorite={!!favorites[keyFor(cat.id, r.name)]}
                  onOpen={() => onOpenRecipe(card)}
                  onToggleFavorite={() => onToggleFavorite(card)}
                />
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

function FavoritosView({
  recipes,
  onOpenRecipe,
  favorites,
  onToggleFavorite,
  onExplore,
}: {
  recipes: RecipeCardData[]
  onOpenRecipe: (r: RecipeCardData) => void
  favorites: Record<string, boolean>
  onToggleFavorite: (r: RecipeCardData) => void
  onExplore: () => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-black text-foreground">Tus favoritos</h1>
        <p className="text-sm text-muted-foreground">Las recetas que guardaste para preparar primero.</p>
      </div>

      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/30 px-6 py-16 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
            <Heart className="size-7" />
          </span>
          <p className="mt-4 font-serif text-lg font-black text-foreground">Aún no tienes favoritos</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Toca el corazón en cualquier receta para guardarla aquí y encontrarla rápido.
          </p>
          <button
            type="button"
            onClick={onExplore}
            className="mt-5 inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Explorar recetas <ChevronRight className="size-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {recipes.map((r) => (
            <RecipeCard
              key={keyFor(r.categoryId, r.name)}
              recipe={r}
              isFavorite={!!favorites[keyFor(r.categoryId, r.name)]}
              onOpen={() => onOpenRecipe(r)}
              onToggleFavorite={() => onToggleFavorite(r)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'border border-border bg-card text-foreground/70 hover:bg-secondary'
      }`}
    >
      {label}
    </button>
  )
}

function RecipeCard({
  recipe,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: {
  recipe: RecipeCardData
  isFavorite: boolean
  onOpen: () => void
  onToggleFavorite: () => void
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <button type="button" onClick={onOpen} className="block w-full text-left" aria-label={`Ver receta ${recipe.name}`}>
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={recipe.image || '/placeholder.svg'}
            alt={recipe.name}
            fill
            sizes="(max-width: 640px) 50vw, 220px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent" />
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
            <Clock className="size-3" /> {recipe.time}
          </span>
          <p className="absolute bottom-9 left-2 right-2 line-clamp-2 font-serif text-sm font-black text-background">
            {recipe.name}
          </p>
        </div>
      </button>
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        aria-pressed={isFavorite}
        className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-card"
      >
        <Heart className={`size-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
      </button>
    </div>
  )
}

function RecipeModal({
  recipe,
  isFavorite,
  onToggleFavorite,
  onClose,
}: {
  recipe: RecipeCardData
  isFavorite: boolean
  onToggleFavorite: () => void
  onClose: () => void
}) {
  const ficha = fichaByCategory[recipe.categoryId]
  const benefitIcon = { money: DollarSign, cold: Snowflake, heart: Heart }
  const benefitColor = {
    money: 'bg-accent text-accent-foreground',
    cold: 'bg-primary text-primary-foreground',
    heart: 'bg-highlight text-highlight-foreground',
  }

  // Si la receta ya tiene su arte (póster) generada, mostramos la imagen.
  const hasPoster = postersReady.has(recipeSlug(recipe.name))
  if (hasPoster) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={recipe.name}
        onClick={onClose}
      >
        <div
          className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-background sm:rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <p className="truncate font-serif text-lg font-black text-foreground">{recipe.name}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleFavorite}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground"
              >
                <Heart className={`size-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="bg-secondary/40 p-3 sm:p-4">
            <Image
              src={posterPath(recipe.name) || '/placeholder.svg'}
              alt={`Receta ${recipe.name}`}
              width={1024}
              height={1536}
              className="h-auto w-full rounded-xl shadow-lg"
              priority
            />
          </div>

          <div className="p-4">
            <a
              href={posterPath(recipe.name)}
              download={`${recipeSlug(recipe.name)}.png`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow transition-transform hover:scale-[1.02]"
            >
              <Download className="size-4" />
              Descargar receta
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={recipe.name}
      onClick={onClose}
    >
      <div
        className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-background sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Branded flag header */}
        <div className="relative flex items-center justify-between gap-3 bg-secondary/60 px-4 py-3 sm:px-6">
          <Image
            src="/dulces/flag-brasil.png"
            alt="Bandera de Brasil"
            width={48}
            height={32}
            className="h-8 w-12 shrink-0 rounded object-cover shadow-sm"
          />
          <div className="min-w-0 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
              Recetas de
            </p>
            <p className="font-serif text-lg font-black uppercase leading-none text-primary sm:text-xl">
              Dulces Brasileños
            </p>
            <p className="text-xs font-black uppercase tracking-widest text-accent-foreground">Virales</p>
          </div>
          <Image
            src="/dulces/flag-mexico.png"
            alt="Bandera de México"
            width={48}
            height={32}
            className="h-8 w-12 shrink-0 rounded object-cover shadow-sm"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-card/90 text-foreground shadow"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Header */}
        <div className="relative">
          <div className="relative h-56 w-full sm:h-72">
            <Image src={recipe.image || '/placeholder.svg'} alt={recipe.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-foreground/10" />
          </div>

          {/* Recipe number badge */}
          <div className="absolute left-4 top-4 rounded-2xl bg-primary px-3 py-1.5 text-center text-primary-foreground shadow-lg">
            <p className="text-[10px] font-bold uppercase leading-none tracking-widest">Receta</p>
            <p className="font-serif text-2xl font-black leading-none">
              {String(recipe.number).padStart(2, '0')}
            </p>
          </div>

          {/* Decorative seals */}
          <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
            <span className="flex size-14 flex-col items-center justify-center rounded-full border-2 border-dashed border-background/80 bg-primary/90 text-center text-[7px] font-black uppercase leading-tight tracking-wide text-primary-foreground shadow">
              Sabores
              <br />
              que
              <br />
              enamoran
            </span>
            <span className="flex size-14 flex-col items-center justify-center rounded-full border-2 border-dashed border-background/80 bg-accent/90 text-center text-[7px] font-black uppercase leading-tight tracking-wide text-accent-foreground shadow">
              Hecho
              <br />
              para
              <br />
              vender
            </span>
          </div>

          {/* Rinde seal */}
          <div className="absolute bottom-4 right-4 flex size-20 flex-col items-center justify-center rounded-full border-4 border-background bg-accent text-center text-accent-foreground shadow-lg">
            <span className="text-[8px] font-bold uppercase leading-none tracking-wide">Rinde aprox.</span>
            <span className="font-serif text-xl font-black leading-none">{recipe.yield.replace(/\D/g, '') || '20'}</span>
            <span className="text-[8px] font-bold uppercase leading-none tracking-wide">porciones</span>
          </div>

          <div className="absolute bottom-4 left-4 right-28">
            <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
              {recipe.categoryTitle}
            </span>
            <h2 className="mt-1.5 font-serif text-3xl font-black leading-none text-balance text-background sm:text-4xl">
              {recipe.name}
            </h2>
            {ficha?.tagline && (
              <p className="mt-2 max-w-md text-sm font-semibold text-pretty text-background/90">{ficha.tagline}</p>
            )}
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground">
              <Clock className="size-3.5 text-primary" /> {recipe.time}
              <span className="text-border">|</span>
              <Users className="size-3.5 text-primary" /> Rinde {recipe.yield}
            </p>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          {/* Benefit badges */}
          {ficha && (
            <div className="grid gap-3 sm:grid-cols-3">
              {ficha.benefits.map((b) => {
                const Icon = benefitIcon[b.icon]
                return (
                  <div key={b.title} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3">
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${benefitColor[b.icon]}`}>
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase leading-tight tracking-wide text-foreground">{b.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{b.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Ingredients + Preparation */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 inline-block rounded-full bg-accent px-3 py-1 font-serif text-base font-black text-accent-foreground">
                Ingredientes
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing) => (
                  <li key={ing} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="mb-3 inline-block rounded-full bg-primary px-3 py-1 font-serif text-base font-black text-primary-foreground">
                Preparación
              </h3>
              <ol className="space-y-3">
                {recipe.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-foreground/90">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {ficha && (
            <>
              {/* ¿Qué necesitas? */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="mb-4 font-serif text-lg font-black text-foreground">¿Qué necesitas?</h3>
                <div className="flex flex-wrap gap-3">
                  {ficha.utensils.map((u) => (
                    <span
                      key={u}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-bold text-foreground"
                    >
                      <Utensils className="size-3.5 text-primary" />
                      {u}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tip + Conservación */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3 rounded-2xl border border-border bg-highlight/25 p-4">
                  <Lightbulb className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-black text-foreground">Tip del éxito</p>
                    <p className="mt-1 text-sm text-foreground/80">{ficha.tip}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl border border-border bg-card p-4">
                  <Snowflake className="size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-black text-foreground">Conservación</p>
                    <p className="mt-1 text-sm text-foreground/80">{ficha.conservation}</p>
                  </div>
                </div>
              </div>

              {/* Perfecto para vender + Precio */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="mb-3 font-serif text-lg font-black text-primary">¡Perfecto para vender!</h3>
                  <ul className="space-y-2">
                    {ficha.sellingPoints.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-deal p-5 text-center text-deal-foreground">
                  <p className="text-xs font-bold uppercase tracking-wide text-highlight">Precio sugerido</p>
                  <p className="mt-1 font-serif text-4xl font-black text-highlight">{ficha.price}</p>
                  <p className="mt-1 text-sm opacity-90">{ficha.priceUnit}</p>
                  <p className="mt-1 text-[11px] opacity-70">(o el equivalente en tu moneda local)</p>
                </div>
              </div>

              {/* Footer */}
              <div className="rounded-2xl bg-primary px-4 py-3 text-center">
                <p className="font-serif text-sm font-black uppercase tracking-wide text-primary-foreground">
                  {ficha.footer}
                </p>
              </div>
            </>
          )}

          {/* Favorite action */}
          <button
            type="button"
            onClick={onToggleFavorite}
            className="mx-auto flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground"
          >
            <Heart className={`size-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
            {isFavorite ? 'Guardada en favoritos' : 'Guardar en favoritos'}
          </button>
        </div>
      </div>
    </div>
  )
}

function CategoriasView({ onOpenCategory }: { onOpenCategory: (catId: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-black text-foreground">Categorías</h1>
        <p className="text-sm text-muted-foreground">Elige un tipo de dulce y descubre todas sus recetas.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onOpenCategory(cat.id)}
            className="group overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="relative h-40 w-full">
              <Image
                src={cat.image || '/placeholder.svg'}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
              <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
                {cat.recipes.length} recetas
              </span>
              <h2 className="absolute bottom-3 left-4 right-4 font-serif text-xl font-black text-balance text-background">
                {cat.title}
              </h2>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <p className="text-sm text-muted-foreground">{cat.description}</p>
              <ChevronRight className="size-5 shrink-0 text-primary" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ComprasView() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  function toggle(item: string) {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }))
  }

  const total = shoppingList.reduce((n, g) => n + g.items.length, 0)
  const done = Object.values(checked).filter(Boolean).length

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-black text-foreground">Lista de compras</h1>
          <p className="text-sm text-muted-foreground">
            Todo lo que necesitas para empezar, organizado por sección.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-foreground">
          <ShoppingCart className="size-4 text-primary" />
          {done} de {total} listos
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {shoppingList.map((group) => (
          <section key={group.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-3 inline-block rounded-full bg-accent px-3 py-1 font-serif text-base font-black text-accent-foreground">
              {group.title}
            </h2>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isDone = !!checked[item]
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => toggle(item)}
                      aria-pressed={isDone}
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition-colors hover:bg-secondary/50"
                    >
                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                          isDone ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                        }`}
                      >
                        {isDone && <Check className="size-3" strokeWidth={3} />}
                      </span>
                      <span className={isDone ? 'text-muted-foreground line-through' : 'text-foreground/90'}>
                        {item}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="rounded-2xl bg-primary px-4 py-3 text-center">
        <p className="font-serif text-sm font-black uppercase tracking-wide text-primary-foreground">
          Marca lo que ya tienes y compra solo lo que falta
        </p>
      </div>
    </div>
  )
}

const tipIconMap = {
  calc: Calculator,
  camera: Camera,
  whatsapp: MessageCircle,
  home: MapPin,
  combo: Package,
  present: Sparkles,
}

function TipsView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-black text-foreground">Tips para vender</h1>
        <p className="text-sm text-muted-foreground">
          Consejos prácticos para vender más y presentar tus dulces como un negocio profesional.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sellingTips.map((tip) => {
          const Icon = tipIconMap[tip.icon]
          return (
            <article key={tip.title} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-4 font-serif text-lg font-black text-foreground">{tip.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{tip.text}</p>
              <ul className="mt-3 space-y-2">
                {tip.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function PreciosView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-black text-foreground">Precios sugeridos</h1>
        <p className="text-sm text-muted-foreground">
          Una guía de referencia para cobrar bien y ganar en cada venta. Ajusta a tu moneda local.
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-deal text-deal-foreground">
            <tr>
              <th className="px-4 py-3 font-black">Dulce</th>
              <th className="px-4 py-3 font-black">Costo estimado</th>
              <th className="px-4 py-3 font-black">Precio sugerido</th>
              <th className="px-4 py-3 font-black">Margen aprox.</th>
              <th className="px-4 py-3 font-black">Mejor ocasión</th>
            </tr>
          </thead>
          <tbody>
            {priceTable.map((row, i) => (
              <tr key={row.name} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}>
                <td className="px-4 py-3 font-bold text-foreground">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.cost}</td>
                <td className="px-4 py-3 font-black text-primary">{row.price}</td>
                <td className="px-4 py-3 font-bold text-accent-foreground">{row.margin}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.occasion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {priceTable.map((row) => (
          <div key={row.name} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="font-serif text-base font-black text-foreground">{row.name}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Costo estimado</p>
                <p className="font-bold text-foreground">{row.cost}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Precio sugerido</p>
                <p className="font-black text-primary">{row.price}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Margen aprox.</p>
                <p className="font-bold text-accent-foreground">{row.margin}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mejor ocasión</p>
                <p className="text-foreground/90">{row.occasion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-border bg-highlight/25 p-4">
        <Lightbulb className="size-5 shrink-0 text-primary" />
        <p className="text-sm text-foreground/80">
          Estos precios son una referencia general. Considera tu zona, el costo de tus ingredientes y la
          presentación para definir el precio final.
        </p>
      </div>
    </div>
  )
}

function BonosView() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">5 materiales extra para vender más y organizarte mejor.</p>
      <BonosSection />
    </div>
  )
}

function BonosSection() {
  return (
    <section id="bonos" aria-labelledby="bonos-title" className="scroll-mt-6">
      <div className="mb-4 flex items-center gap-2">
        <Gift className="size-5 text-primary" />
        <h2 id="bonos-title" className="font-serif text-2xl font-black text-foreground">
          Tus 5 bonos exclusivos
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {bonuses.map((b) => (
          <div
            key={b.title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-secondary/40">
              <Image src={b.image || '/placeholder.svg'} alt={b.title} fill className="object-contain" />
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="font-serif text-base font-black leading-tight text-foreground">{b.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{b.description}</p>
              <ul className="mt-2 space-y-1">
                {b.items.map((it) => (
                  <li key={it} className="flex items-start gap-1.5 text-xs text-foreground/80">
                    <Check className="mt-0.5 size-3 shrink-0 text-accent-foreground" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href={b.file}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="size-3.5" />
                {b.fileLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
