import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';
import MainSharedLayout from '@/shared/layouts/main-layout';
import jsonData from '@/data/index.json';
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Toast, showToast } from '@/shared/utils/toast.util';

const Home: NextPageWithLayout = () => {
  const { status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(jsonData);

  const handleDragEnd: OnDragEndResponder = (result) => {
    if (status === 'unauthenticated') {
      showToast(Toast.info, 'You must be logged in.');
      router.push('/api/auth/signin');
      return;
    }
    const { source, destination, draggableId } = result;
    // If dropped outside a droppable area, do nothing
    if (!destination) {
      return;
    }

    // If dropped in the same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Get the column where the task was originally located
    const sourceColumn = data.boardColumns.find((column) => `column-${column.id}` === source.droppableId) as any;

    // Get the column where the task was dropped
    const destinationColumn = data.boardColumns.find((column) => `column-${column.id}` === destination.droppableId) as any;

    // If the task was moved within the same column
    if (sourceColumn === destinationColumn) {
      // Reorder the task in the same column
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };
      const newData = {
        ...data,
        boardColumns: data.boardColumns.map((column) => (column.id === newColumn.id ? newColumn : column)),
      } as any;
      setData(newData);
    } else {
      // Move the task to another column
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };
      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };
      const newData = {
        ...data,
        boardColumns: data.boardColumns.map((column) =>
          column.id === newSourceColumn.id ? newSourceColumn : column.id === newDestinationColumn.id ? newDestinationColumn : column
        ),
      };
      setData(newData);
    }
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section className="board flex gap-6 min-h-[calc(100vh-82px)]">
        {data.boardColumns.map((column) => (
          <Droppable droppableId={`column-${column.id}`} key={column.id}>
            {(provided) => (
              <div className="column min-w-[240px]">
                <div className="column-heading opacity-80 mb-4 text-sm font-bold tracking-wide">
                  {column.title} ({column.taskIds.length})
                </div>
                <section className="tasks flex flex-col gap-y-6" {...provided.droppableProps} ref={provided.innerRef}>
                  {column.taskIds.map((taskId, taskIndex) => {
                    const task = data.tasks.find((t) => t.id === taskId) as any;
                    return (
                      <Draggable key={taskId} draggableId={taskId} index={taskIndex}>
                        {(provided) => (
                          <div
                            className="task card w-72 max-w-xl bg-base-200 shadow-md"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={taskId}>
                            <div className="card-body p-4">
                              <h2 className="card-title text-base">{task.taskTitle}</h2>
                              <p className="opacity-80 text-sm">1 of 3 subtasks</p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                </section>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </section>
    </DragDropContext>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <MainSharedLayout>{page}</MainSharedLayout>;
};
