import { writeFile } from 'fs'
import { random } from 'lodash'
import { promisify } from 'util'
import { placeOf } from 'utilizes/place-of'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MainService {
  async saveImage(baseImage: string) {

    const
      ext = baseImage.substring(placeOf(baseImage, `/`), baseImage.indexOf(`;base64`)),
      { MIN_VALUE, MAX_VALUE } = Number,
      filename = `${random(MIN_VALUE, MAX_VALUE)}.${ext}`;

    await promisify(writeFile)(
      `${process.cwd()}/views/public/server/images/${filename}`,
      baseImage.replace(
        new RegExp(`^data:${baseImage.substring(`data:`.length, baseImage.indexOf(`/`))}\/${ext};base64,`, `gi`),
        ``
      ),
      `base64`
    )

    return filename

  }
}
