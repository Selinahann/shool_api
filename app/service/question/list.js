'use strict';
const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;
class TypeService extends Service {
  // 插入试题类型
  async insert(params) {
    const id = this.ctx.helper.randomString(2); // 生成ID
    const json_path = `${id}.json`; // 文件路径
    const jsonContent = {};
    const insertData = {
      id,
      question_type_id: params.question_type_id,
      userId: '',
      content: params.content,
      createdAt: new Date(),
      difficulty: params.difficulty,
      path: json_path,
      outline_id: params.outline_id,
      majors_id: params.majors_id,
      subject_id: params.subject_id,
    };

    for (const key in params) {
      if (![ 'id', 'question_type_id', 'content', 'createdAt', 'difficulty', 'path', 'outline_id', 'majors_id', 'subject_id' ].includes(key)) {
        jsonContent[key] = params[key];
      }
    }

    fs.writeFileSync(
      path.join(this.app.config.questionsRootPath, json_path),
      JSON.stringify(jsonContent),
      'utf-8'
    );
    const result = await this.app.mysql.insert('question', insertData);

    return result.affectedRows === 1;
  }
  dealQuestions(result) {
    return result.map(item => {
      let jsonContent = fs.readFileSync(path.join(this.app.config.questionsRootPath, item.path));
      jsonContent = JSON.parse(jsonContent);
      return {
        ...item,
        ...jsonContent,
      };
    });
  }
  // 获取所有的试题类型
  async select({ page, page_size, ...where }) {
    let SQL_ALLQUESTIONS = `
      SELECT
        question.content AS content,
        question.id AS id,
        question.path AS path,
        question.difficulty AS difficulty,
        question_type.question_type_text AS question_type_text,
        question.numUsed AS numUsed,
        question.outline_id AS outline_id,
        question.majors_id AS majors_id,
        question.subject_id AS subject_id
      FROM
        question,
        question_type
      WHERE
        question.question_type_id=question_type.question_type_id
      
    `;
    if (where) {
      for (const key in where) {
        if (typeof where[key] === 'object') {
          const values = where[key].reduce((prev, item) => {
            return prev + `,'${item}'`;
          }, '');
          SQL_ALLQUESTIONS += ` AND question.${key} IN (${values.substr(1)})`;
        } else {
          SQL_ALLQUESTIONS += ` AND question.${key}='${where[key]}'`;
        }
      }
    }
    SQL_ALLQUESTIONS += 'ORDER BY question.createdAt DESC';
    const total = await this.app.mysql.select('question', {
      where,
    });
    SQL_ALLQUESTIONS += ` LIMIT ${(page - 1) * page_size},${page_size}`;
    const questions = await this.app.mysql.query(SQL_ALLQUESTIONS);
    return {
      questions: this.dealQuestions(questions),
      total: total.length,
    };
  }
  // 试题的类型是否重复
  async isRepeat(text) {
    const checkRes = await this.app.mysql.query('select * from question_type where question_type_text=?', [ text ]);
    return checkRes.length !== 0;
  }
  // 删除某个试题类型
  async delete(id) {
    const result = await this.app.mysql.delete('question_type', { question_type_id: id });
    return result.affectedRows;
  }
  async randomQuestion(where) {
    let sql = `
      SELECT
        question.content AS name,
        question.id AS question_id,
        question.path AS path,
        question_type.question_type_text AS type
      FROM
        question,
        question_type
      WHERE 
        question.question_type_id=question_type.question_type_id
    `;
    if (where) {
      for (const key in where) {
        if (key !== 'number') {
          if (typeof where[key] === 'object') {
            const values = where[key].reduce((prev, item) => {
              return prev + `,'${item}'`;
            }, '');
            sql += ` AND question.${key} in (${values.substr(1)})`;
          } else {
            sql += ` AND question.${key}='${where[key]}'`;
          }
        }
      }
    }
    sql += `ORDER BY RAND() LIMIT ${where.number || 10}`;
    const questions = await this.app.mysql.query(sql);
    return this.dealQuestions(questions);
  }
}
module.exports = TypeService;
