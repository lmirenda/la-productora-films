import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FilmCollectionArchive } from '@/components/FilmCollectionArchive'
import RichText from '@/components/RichText'
import type { FilmArchiveBlock as FilmArchiveBlockProps, Film } from '@/payload-types'

export const FilmArchiveBlock = async ({
  id,
  introContent,
  selectedFilms,
}: FilmArchiveBlockProps) => {
  const payload = await getPayload({ config: configPromise })

  const filmIDs = Array.isArray(selectedFilms)
    ? selectedFilms
        .map((entry) => {
          if (typeof entry?.film === 'object') return entry.film.id
          if (typeof entry?.film === 'number') return entry.film
          return null
        })
        .filter(Boolean)
    : []

  let films: Film[] = []

  if (filmIDs.length > 0) {
    const response = await payload.find({
      collection: 'films',
      where: {
        id: {
          in: filmIDs,
        },
      },
      depth: 1,
      limit: filmIDs.length,
    })

    // preserve the manual order
    const filmMap = new Map(response.docs.map((film) => [film.id, film]))
    films = filmIDs
      .filter((id): id is number => id !== null)
      .map((id) => filmMap.get(id)!)
      .filter(Boolean) as Film[]
  }

  return (
    <div className="lg:pt-1 pt-[10px]" id={`block-${id}`}>
      {/*{introContent && (*/}
      {/*  <div className="container mb-16">*/}
      {/*    <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />*/}
      {/*  </div>*/}
      {/*)}*/}
      <FilmCollectionArchive films={films} />
    </div>
  )
}
