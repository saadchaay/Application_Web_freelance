import useInput from "./UseInput"

export default function useCompany() {
   const denomenation = useInput("")
   const statusJuridique = useInput("")
   const nomUtilisateur = useInput("")
   const motPasse = useInput("")
   const dateCreation = useInput("")
   return {
      denomenation,
      statusJuridique,
      nomUtilisateur,
      dateCreation,
      motPasse
   }
}
