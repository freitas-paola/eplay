import { useState } from 'react'
import zoom from '../../assets/images/zoom.svg'
import play from '../../assets/images/play.svg'
import close from '../../assets/images/close.svg'
import Section from '../Section'
import { Items, Item, Action, Modal, ModalContent } from './styles'
import { GalleryItem } from '../../pages/Home'

type Props = {
  defaultCover: string
  name: string
  items: GalleryItem[]
}

interface ModalState extends GalleryItem {
  isVisible: boolean
}

const Gallery = ({ defaultCover, name, items }: Props) => {
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    type: 'image',
    url: ''
  })

  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaultCover
  }

  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoom
    return play
  }

  const closeModal = () => {
    setModal({
      isVisible: false,
      type: 'image',
      url: ''
    })
  }

  return (
    <>
      <Section title="Galeira" background="black">
        <Items>
          {items.map((midia, i) => (
            <Item
              key={midia.url}
              onClick={() => {
                setModal({
                  isVisible: true,
                  type: midia.type,
                  url: midia.url
                })
              }}
            >
              <img
                src={getMediaCover(midia)}
                alt={`Midia ${i + 1} de ${name}`}
              />
              <Action>
                <img
                  src={getMediaIcon(midia)}
                  alt="Clique para maximizar a mídia"
                />
              </Action>
            </Item>
          ))}
        </Items>
      </Section>
      <Modal className={modal.isVisible ? 'visivel' : ''}>
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img
              src={close}
              alt="Ícone de fechar"
              onClick={() => {
                closeModal()
              }}
            />
          </header>
          {modal.type === 'image' ? (
            <img src={modal.url} />
          ) : (
            <iframe src={modal.url} frameBorder={0} />
          )}
        </ModalContent>
        <div
          className="overlay"
          onClick={() => {
            closeModal()
          }}
        ></div>
      </Modal>
    </>
  )
}

export default Gallery
