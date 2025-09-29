import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/connect';
import { ObjectId } from 'mongodb';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("polls");
    const polls = await collection.find({}).toArray();
    
    return NextResponse.json({ 
      success: true, 
      polls: polls 
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch polls' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, city, options } = body;
    
    // Convert comma-separated string to options array
    const optionsArray = options.split(',').map((opt: string) => ({
      optionId: randomUUID(),
      title: opt.trim(),
      votesCount: 0
    }));
    
    const db = await getDb();
    const collection = db.collection("polls");
    
    const pollData = {
      title,
      description,
      city,
      status: 'open',
      createdAt: new Date(),
      closedAt: null,
      options: optionsArray
    };
    
    const result = await collection.insertOne(pollData);
    
    return NextResponse.json({ 
      success: true, 
      pollId: result.insertedId 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to create poll' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pollId = searchParams.get('id');
    
    if (!pollId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Poll ID is required' 
      }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection("polls");
    
    const result = await collection.deleteOne({ _id: new ObjectId(pollId) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Poll not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Poll deleted successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting poll:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to delete poll' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { pollId, status } = body;
    
    const db = await getDb();
    const collection = db.collection("polls");
    
    const result = await collection.updateOne({ _id: new ObjectId(pollId) }, { $set: { status } });
    
    if (result.modifiedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Poll not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Poll status updated successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating poll status:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update poll status' 
    }, { status: 500 });
  }
}





