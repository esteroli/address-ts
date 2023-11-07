import { useState } from 'react'
import axios from 'axios'

import styles from './Form.module.css'

interface FormProps {
    type: string
    text: string
    placeholder: string
}

interface AddressData {
  cep: number
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

const Form = ({type, text, placeholder}: FormProps) => {
  const [ cep, setCep ] = useState('')
  const [ address, setAddress ] = useState<AddressData>({} as AddressData)
  const [ showDetails, setShowDetails ] = useState(false)
  
  //evento chamado quando ocorre um evento de mudança no campo do cep
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
    console.log(setCep)
  }
  
  //mostra as infos quando o botão é clicado
  const handleClick = async (e: any) => {
    e.preventDefault()
    if (cep.length == 8) {
        try {
            const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            //quando der certo:
            console.log(data)
            setAddress(data)
            setShowDetails(true);
        }
        catch(err) {
            console.log(err)
        } 
        finally {
            console.log('resultado')
        }
    }
  }

  return (
    <div className={styles.form_control}>
        <form>
            <label>{text}</label>
            <input type={type} placeholder={placeholder} onChange={handleChange}></input>
            <br></br>
            <button onClick={handleClick}>Buscar</button>
        </form>

        {showDetails && Object.keys(address).length > 0 && (
        <div className={styles.details}>
            <h2>Seu endereço é:</h2>
            <p>CEP: {address.cep}</p>
            <p>Rua: {address.logradouro}</p>
            <p>Bairro: {address.bairro}</p>
            <p>Cidade: {address.localidade}</p>
            <p>Estado: {address.uf}</p>
        </div>
      )}
    </div>
  )
}

export default Form