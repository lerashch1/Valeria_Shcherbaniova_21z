const {prisma} = require('../prisma/prisma-client');

//Все публикации
const all = async(req, res) => {
    try {
        const publications = await prisma.publication.findMany();
        res.status(200).json(publications);
    } catch {
        res.status(500).json({message: 'Не удалось получить публикации'});
    }
};

//Добавление публикации
const add = async (req, res) => {
    try {
        const data = req.body;
        //Заполнены ли все обязательные поля для добавления публикации
        if(!data.category || !data.name || !data.ingredients || !data.time || !data.description || !data.note) {
            return res.status(400).json({message: 'Заполните все обязательные поля'});
        }
        //Добавление
        const publication = await prisma.publication.create({
            data: {
              ...data,
              userId: req.user.id,
            }
          });
          //Вывод публикации
          return res.status(201).json(publication);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось добавить публикацию" });
    }
};

//Удаление публикации
const remove = async (req, res) => {
    const { id } = req.body;
    try {
      //Удаление
      await prisma.publication.delete({
        where: {
          id,
        },
      });
      //Удаление успешно
      res.status(204).json("Публикация удалена");
    } catch {
      res.status(500).json({ message: "Не удалось удалить публикацию" });
    }
};

//Редактирование публикации
const edit = async (req, res) => {
    const data = req.body;
    const id = data.id;
    try {
      //Выбор публикации и редактирование полей
      await prisma.publication.update({
        where: {
          id,
        },
        data,
      });
      //Успешное редактирование
      res.status(204).json("Публикация отредактирована");
    } catch(err) {
      res.status(500).json({ message: "Не удалось редактировать публикацию" });
    }
};

//Получение публикации
const publication = async (req, res) => {
    const { id } = req.params;
    //Выбор публикации по id
    try {
      const publication = await prisma.publication.findUnique({
        where: {
          id,
        },
      });
      //Вывод публикации
      res.status(200).json(publication);
    } catch {
      res.status(500).json({ message: "Не удалось получить публикацию" });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    publication
}