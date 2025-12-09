import { Address } from '@/services/domain/address.types'

interface IAddressResultProps {
  address: Address.IAddress
}

export function AddressResult({ address }: IAddressResultProps) {
  return (
    <div className="address-result">
      <h2 className="address-result__title">Resultado</h2>
      <div className="address-result__grid">
        <div className="address-result__item">
          <span className="address-result__label">CEP:</span>
          <span className="address-result__value">{address.cep}</span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">Logradouro:</span>
          <span className="address-result__value">{address.street || '-'}</span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">Complemento:</span>
          <span className="address-result__value">
            {address.complement || '-'}
          </span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">Bairro:</span>
          <span className="address-result__value">
            {address.district || '-'}
          </span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">Cidade:</span>
          <span className="address-result__value">{address.city || '-'}</span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">Estado:</span>
          <span className="address-result__value">{address.state || '-'}</span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">IBGE:</span>
          <span className="address-result__value">{address.ibge || '-'}</span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">GIA:</span>
          <span className="address-result__value">{address.gia || '-'}</span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">DDD:</span>
          <span className="address-result__value">
            {address.areaCode || '-'}
          </span>
        </div>
        <div className="address-result__item">
          <span className="address-result__label">SIAFI:</span>
          <span className="address-result__value">{address.siafi || '-'}</span>
        </div>
      </div>
    </div>
  )
}
