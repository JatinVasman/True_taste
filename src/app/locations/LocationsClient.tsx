'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Sparkles, Filter, ChevronRight } from 'lucide-react';
import type { CityData } from '@/lib/cities';

interface LocationsClientProps {
  cities: CityData[];
  states: string[];
}

export default function LocationsClient({ cities, states }: LocationsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<'All' | 'Tier 1' | 'Tier 2' | 'Tier 3'>('All');
  const [selectedState, setSelectedState] = useState<string>('All');

  // Filtered cities
  const filteredCities = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return cities.filter((city) => {
      const matchesSearch =
        !q ||
        city.name.toLowerCase().includes(q) ||
        city.state.toLowerCase().includes(q) ||
        city.culinaryContext.toLowerCase().includes(q);

      const matchesTier = selectedTier === 'All' || city.tier === selectedTier;
      const matchesState = selectedState === 'All' || city.state === selectedState;

      return matchesSearch && matchesTier && matchesState;
    });
  }, [cities, searchTerm, selectedTier, selectedState]);

  // Group filtered cities by state
  const stateGroups = useMemo(() => {
    const map = new Map<string, CityData[]>();
    for (const city of filteredCities) {
      if (!map.has(city.state)) {
        map.set(city.state, []);
      }
      map.get(city.state)!.push(city);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredCities]);

  // Tier 1 cities for featured display
  const tier1Cities = useMemo(() => {
    return cities.filter((c) => c.tier === 'Tier 1');
  }, [cities]);

  return (
    <div className="min-h-screen bg-[#FFF8EF]">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 px-6 md:px-10 bg-gradient-to-b from-[#2E5E2E]/10 via-[#FFF8EF] to-[#FFF8EF] overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#7AA33E]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#F2E6C9]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-lato text-[#7a6b4e]">
            <Link href="/" className="hover:text-[#2E5E2E] transition-colors">
              Home
            </Link>
            <span className="text-[#7AA33E]">/</span>
            <span className="text-[#2E5E2E] font-bold">Indian Locations</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E5E2E]/10 text-[#2E5E2E] text-xs font-lato font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#7AA33E]" />
            <span>Pan-India Local SEO Network · {cities.length}+ Cities</span>
          </div>

          <h1 className="font-playfair font-extrabold text-[#2E5E2E] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            Pure Indian Spices in Every Corner of India
          </h1>

          <p className="font-lato text-[#7a6b4e] text-base md:text-lg max-w-3xl leading-relaxed mb-10">
            Explore Delhi Wally&apos;s location directory spanning over {cities.length} Indian cities across Tier 1,
            Tier 2, and Tier 3. From vibrant metro kitchens to historic culinary hubs, discover how our 5 pure,
            stone-ground spices elevate every authentic regional dish.
          </p>

          {/* Search & Filter Bar */}
          <div className="bg-[#FFFDF8] p-4 sm:p-6 rounded-2xl border border-[rgba(242,230,201,0.9)] shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6b4e]" />
                <input
                  type="text"
                  placeholder="Search by city name, state, or dish (e.g. Lucknow, Kerala, Biryani)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-[#FFF8EF]/50 text-sm font-lato text-[#2E5E2E] focus:outline-none focus:border-[#7AA33E] focus:ring-2 focus:ring-[#7AA33E]/20 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7a6b4e] hover:text-[#2E5E2E] px-2 py-0.5 rounded bg-stone-100"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* State Filter */}
              <div className="relative sm:w-64">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-[#FFF8EF]/50 text-sm font-lato text-[#2E5E2E] focus:outline-none focus:border-[#7AA33E] focus:ring-2 focus:ring-[#7AA33E]/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="All">All States & UTs ({states.length})</option>
                  {states.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a6b4e] pointer-events-none" />
              </div>
            </div>

            {/* Tier Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
              <span className="text-xs font-lato font-bold text-[#7a6b4e] uppercase tracking-wider mr-2">
                Classification:
              </span>
              {(['All', 'Tier 1', 'Tier 2', 'Tier 3'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-lato font-bold transition-all ${
                    selectedTier === tier
                      ? 'bg-[#2E5E2E] text-[#FFF8EF] shadow-sm'
                      : 'bg-[#FFF8EF] text-[#2E5E2E] border border-stone-200 hover:border-[#7AA33E]'
                  }`}
                >
                  {tier === 'All' ? `All Cities (${cities.length})` : tier}
                </button>
              ))}
              <span className="ml-auto text-xs font-lato text-[#7a6b4e]">
                Showing <strong className="text-[#2E5E2E]">{filteredCities.length}</strong> matching locations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tier 1 Mega Metros (shown when no specific filter active) */}
      {selectedTier === 'All' && selectedState === 'All' && !searchTerm && (
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[#7AA33E] font-lato text-xs font-bold uppercase tracking-[0.2em] block mb-1">
                Tier 1 Metros
              </span>
              <h2 className="font-playfair font-bold text-[#2E5E2E] text-2xl">
                Major Indian Metropolitan Centers
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {tier1Cities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="group p-5 bg-[#FFFDF8] rounded-2xl border border-[rgba(242,230,201,0.8)] hover:border-[#7AA33E]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-[#2E5E2E]/10 flex items-center justify-center text-[#2E5E2E] text-xs font-bold group-hover:bg-[#2E5E2E] group-hover:text-[#FFF8EF] transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#7AA33E]/15 text-[#2E5E2E]">
                      {city.tier}
                    </span>
                  </div>
                  <h3 className="font-playfair font-bold text-[#2E5E2E] text-lg mb-1 group-hover:text-[#7AA33E] transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-[#7a6b4e] font-lato mb-3">{city.state}</p>
                  <p className="text-[0.75rem] text-[#7a6b4e]/85 font-lato line-clamp-2 leading-relaxed">
                    {city.culinaryContext}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-[#7AA33E] font-bold group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Spices</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Directory: State by State */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-10 pb-24">
        {filteredCities.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFDF8] rounded-2xl border border-stone-200">
            <p className="font-playfair text-xl text-[#2E5E2E] font-bold mb-2">No Indian cities found</p>
            <p className="font-lato text-sm text-[#7a6b4e] mb-4">
              Try adjusting your search query or reset the filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTier('All');
                setSelectedState('All');
              }}
              className="btn-primary text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {stateGroups.map(([stateName, cityList]) => (
              <div
                key={stateName}
                className="bg-[#FFFDF8] rounded-2xl border border-[rgba(242,230,201,0.8)] p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-6 bg-[#7AA33E] rounded-full" />
                    <div>
                      <h2 className="font-playfair font-bold text-xl md:text-2xl text-[#2E5E2E]">
                        {stateName}
                      </h2>
                      <span className="text-xs font-lato text-[#7a6b4e]">
                        {cityList.length} {cityList.length === 1 ? 'Location' : 'Locations'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {cityList.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/locations/${city.slug}`}
                      className="group p-3 rounded-xl bg-[#FFF8EF]/50 hover:bg-[#FFF8EF] border border-stone-100 hover:border-[#7AA33E]/40 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <span className="font-playfair font-bold text-[#2E5E2E] text-sm group-hover:text-[#7AA33E] transition-colors leading-tight">
                          {city.name}
                        </span>
                        <span className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-[#7a6b4e] flex-shrink-0">
                          {city.tier}
                        </span>
                      </div>
                      <span className="text-[0.68rem] text-[#7AA33E] font-lato font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        View City →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
