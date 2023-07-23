import { NextResponse } from "next/server";

import getCurrentuser from "@/app/actions/getCurrentUser";
import Prismadb from '@/app/libs/Prismadb'
import { get } from "http";
import { use } from "react";

interface Iparams{
    listingId?: string;

}

export async function POST(
    request:Request,
    { params }: { params: Iparams }
 ) {
    const currentUser = await getCurrentuser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string') {
        throw new Error('Invalis ID');
    }

    let favouriteIds = [...(currentUser.favoriteIds || [])];

    favouriteIds.push(listingId);

    const user = await Prismadb.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favouriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request:Request ,
    { params }: { params: Iparams }

) {
    const currentUser = await getCurrentuser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== 'string') {
        throw new Error('Invalis ID');
    }

    let favouriteIds = [...(currentUser.favoriteIds || [])];

    favouriteIds = favouriteIds.filter((id) => id!=listingId);

    const user = await Prismadb.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds: favouriteIds
        }
    });

    return NextResponse.json(user);
}