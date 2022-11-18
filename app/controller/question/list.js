'use strict';

const Controller = require('egg').Controller;
function shuffle(arr) {
  let l = arr.length;
  let index,
    temp;
  while (l > 0) {
    index = Math.floor(Math.random() * l);
    temp = arr[l - 1];
    arr[l - 1] = arr[index];
    arr[index] = temp;
    l--;
  }
  return arr;
}

class QuestionController extends Controller {
  async index() {
    const where = this.ctx.request.query;
    const res = await this.ctx.service.question.list.select(where);
    this.ctx.body = {
      code: 1,
      data: res.questions,
      pagination: {
        page: where.page || 1,
        page_size: where.page_size || 10,
        total: res.total,
      },
    };
  }
  async randomQuestion() {
    const { outline_id } = this.ctx.request.query;
    // const subject = await this.service.educational.subject.select();
    const outline = await this.app.mysql.get('outline', {
      outline_id,
    });
    const subject = await this.app.mysql.get('subject', {
      subject_id: outline.subject_id,
    });
    const outlines = await this.app.mysql.query(`select * from outline where order_id<${outline.order_id} AND subject_id='${outline.subject_id}' ORDER BY order_id desc`);
    const subjects = await this.app.mysql.query(`select * from subject where order_id<${subject.order_id} AND majors_id='${subject.majors_id}' ORDER BY order_id desc`);
    const questions = await this.ctx.service.question.list.randomQuestion({
      outline_id,
      number: outlines.length >= 1 ? 10 : subjects.length >= 1 ? 10 : 20,
      question_type_id: 'w06o1o-g8hy1x',
    });
    const questions2 = await this.ctx.service.question.list.randomQuestion({
      outline_id: outlines.map(item => item.outline_id),
      number: outlines.length >= 1 && subjects.length >= 1 ? 5 : outlines.length >= 1 && subjects.length < 1 ? 10 : 0,
      question_type_id: 'w06o1o-g8hy1x',
    });
    const questions3 = await this.ctx.service.question.list.randomQuestion({
      subject_id: subjects.map(item => item.subject_id),
      number: subjects.length >= 1 ? 5 : 0,
      question_type_id: 'w06o1o-g8hy1x',
    });

    const questions4 = await this.ctx.service.question.list.randomQuestion({
      outline_id,
      number: outlines.length >= 1 ? 10 : subjects.length >= 1 ? 10 : 20,
      question_type_id: '7iuhwq-tq4fwb',
    });
    const questions5 = await this.ctx.service.question.list.randomQuestion({
      outline_id: outlines.map(item => item.outline_id),
      number: outlines.length >= 1 && subjects.length >= 1 ? 5 : outlines.length >= 1 && subjects.length < 1 ? 10 : 0,
      question_type_id: '7iuhwq-tq4fwb',
    });
    const questions6 = await this.ctx.service.question.list.randomQuestion({
      subject_id: subjects.map(item => item.subject_id),
      number: subjects.length >= 1 ? 5 : 0,
      question_type_id: '7iuhwq-tq4fwb',
    });


    const questions7 = await this.ctx.service.question.list.randomQuestion({
      outline_id,
      number: outlines.length >= 1 ? 3 : subjects.length >= 1 ? 3 : 5,
      question_type_id: 'f06o1o-j8hy1x',
    });
    const questions8 = await this.ctx.service.question.list.randomQuestion({
      outline_id: outlines.map(item => item.outline_id),
      number: outlines.length >= 1 && subjects.length >= 1 ? 5 : outlines.length >= 1 && subjects.length < 1 ? 10 : 0,
      question_type_id: 'f06o1o-j8hy1x',
    });
    const questions9 = await this.ctx.service.question.list.randomQuestion({
      subject_id: subjects.map(item => item.subject_id),
      number: subjects.length >= 1 ? 1 : 0,
      question_type_id: 'f06o1o-j8hy1x',
    });
    this.ctx.body = {
      code: 1,
      data: [
        ...shuffle([
          ...questions,
          ...questions2,
          ...questions3,
        ]),
        ...shuffle([
          ...questions4,
          ...questions5,
          ...questions6,
        ]),
        ...shuffle([
          ...questions7,
          ...questions8,
          ...questions9,
        ]),
      ],
    };
  }
  async create() {
    console.log(this.ctx.request.body, 11);
    try {
      this.ctx.validate({
        question_type_id: 'string',
        difficulty: 'number',
        answer: 'array',
        content: 'string',
        explanation: 'string',
        options: 'array',
      }, this.ctx.request.body);
    } catch (error) {
      this.ctx.status = 422;
      this.ctx.body = { msg: '参数传递有误', code: 0 };
      return;
    }

    // const { text, color } = this.ctx.request.query;
    // const isRepeat = await this.ctx.service.question.tags.isRepeat(text);
    // if (isRepeat) {
    //   this.ctx.status = 422;
    //   this.ctx.body = { msg: '标签名称重复', code: 0 };
    //   return;
    // }
    const insertRes = await this.ctx.service.question.list.insert(this.ctx.request.body);
    if (insertRes) {
      this.ctx.status = 201;
      this.ctx.body = { msg: '数据插入', code: 1 };
    } else {
      this.ctx.status = 501;
      this.ctx.body = { msg: '数据插入失败', code: 0 };
    }
  }
  async destroy() {
    try {
      this.ctx.validate({ id: 'string' }, this.ctx.params);
    } catch (err) {
      this.ctx.status = 401;
      this.ctx.body = { msg: 'id传递不正确', code: 0 };
      return;
    }
    const delRes = await this.ctx.service.question.tags.delete(this.ctx.params.id);
    this.ctx.body = delRes === 1 ? { msg: '删除成功', code: 1 } : { msg: '未删除，可能是传递的id在数据库中未找到', code: 0 };
  }
}
module.exports = QuestionController;

/**
  单选题
  answer: "答案"
  content: "题目"
  difficulty: 难度
  explanation: "题目解析"
  options: "[\"AAAAAA\",\"BBBBBB\",\"CCCCC\",\"DDDDD\"]"
  tags: ["mj20e", "mbw7i"]
  type: "类型ID"
 */
