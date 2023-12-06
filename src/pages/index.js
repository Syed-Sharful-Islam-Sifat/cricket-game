import { dbConnect } from "@/config/db"
import mongoose from "mongoose"
import Game from "@/components/game-start/Game";

export default function Home() {
  dbConnect();
  return (
    <>
      <Game/>
    </>
  )
}
