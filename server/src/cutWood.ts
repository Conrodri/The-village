import { Request, Response } from "express";
import * as admin from "firebase-admin";
import db from "./firebase";

const { FieldValue } = admin.firestore;

const cutWood = async (req: Request, res: Response) => {
  try {
    const { userId } = res.locals.user.uid;
    const { woodcuttingLevel } = req.body;

    const playerDoc = await db.collection("players").doc(userId).get();
    const playerData = playerDoc.data();

    // Vérifiez si le joueur a le niveau requis pour couper du bois
    if (playerData?.level < woodcuttingLevel) {
      throw new Error("Le joueur n'a pas le niveau requis pour couper du bois");
    }

    // Vérifiez si le joueur possède un outil de coupe de bois
    if (!playerData?.inventory.woodcuttingTool) {
      throw new Error(
        "Le joueur n'a pas l'outil nécessaire pour couper du bois"
      );
    }

    // Mettre à jour l'inventaire du joueur avec 10 unités de bois
    await db.doc(`users/${userId}`).update({
      inventory: {
        wood: FieldValue.increment(10),
      },
    });

    res.status(200).json({
      message: "Action effectuée avec succès",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default cutWood;
