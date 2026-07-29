import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { productSeed } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const existing = await db
      .select({ id: products.id })
      .from(products)
      .limit(1);

    if (existing.length === 0) {
      await db.insert(products).values(productSeed);
    }

    const rows = await db.select().from(products).orderBy(asc(products.id));

    return NextResponse.json({ ok: true, products: rows });
  } catch (error) {
    console.error("[/api/products] failed:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to load products right now." },
      { status: 500 },
    );
  }
}
