import useInput from "./UseInput"
import useSwitch from "./UseSwitch"

export default function useUser() {
   const nom = useInput("")
   const prenom = useInput("")
   const sexe = useSwitch("male","female")
   const dateNaissance = useInput("")
   const nomUtilisateur = useInput("")
   const motPasse = useInput("")

   return {
      nom,
      prenom,
      sexe,
      dateNaissance,
      nomUtilisateur,
      motPasse,
   }
}
