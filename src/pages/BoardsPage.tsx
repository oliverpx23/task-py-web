import { Card, CardHeader, CardBody, ScrollShadow } from "@nextui-org/react";

export const BoardsPage = () => {
  return (
    <div className="mx-auto">
      <div className="grid h-full w-full justify-center">
        <div className="overflow-hidden text-gray-700 dark:text-slate-400">
          <div className="flex overflow-x-auto gap-6 pb-4">
            {/* tablero */}
            {["a", "b", "c", "d"].map((i) => (
              <div
                key={i}
                className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-success-800">
                  <span className="block text-sm font-semibold uppercase">
                    New (9)
                  </span>
                </div>

                <ScrollShadow
                  className="w-full h-[calc(100vh-200px)] px-4"
                  hideScrollBar
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (i) => (
                      <Card draggable key={i} className="my-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                          <p className="text-tiny uppercase font-bold">
                            Daily Mix
                          </p>
                          <small className="text-default-500">12 Tracks</small>
                          <h4 className="font-bold text-large">
                            Frontend Radio
                          </h4>
                        </CardHeader>
                        <CardBody>WTFF</CardBody>
                      </Card>
                    )
                  )}
                </ScrollShadow>
              </div>
            ))}
            {/* Fin tablero */}

            <div className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700">
              <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-slate-800">
                <span className="block text-sm font-semibold uppercase">
                  New (9)
                </span>
              </div>

              <div className="flex flex-col gap-4 overflow-auto p-4 h-[calc(100vh-200px)] kanban-board custom-scroll">
                WTF
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
