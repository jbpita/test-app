import { DetallePokemon } from "../components/DetallePokemon";
import ResumePokemon from "../components/ResumePokemon";
import { TablePokemon } from "../components/TablePokemon";

export const Home = () => {
    return (
      <div className="container mx-auto h-screen my-auto">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2">
            <TablePokemon/>
          </div>
          <div className="md:w-1/2">
            <DetallePokemon/>
            <ResumePokemon/>
          </div>
        </div>
      </div>
    );
  };
  