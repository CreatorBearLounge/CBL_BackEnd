import { Injectable, NotFoundException } from '@nestjs/common';
import { Art } from 'src/Entity/art.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/Repository/category.repository';
import { ArtistRepository } from 'src/Repository/artist.repository';
import { ArtRepository } from 'src/Repository/art.repository';
import { UserRepository } from 'src/auth/user.repository';
import { DownloadRepository } from 'src/Repository/download.repository';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ArtRepository)
    @InjectRepository(CategoryRepository)
    @InjectRepository(ArtistRepository)
    @InjectRepository(UserRepository)
    @InjectRepository(DownloadRepository)
    private artRepository: ArtRepository,
    private categoryRepository: CategoryRepository,
    private artistRepository: ArtistRepository,
    private userRepository: UserRepository,
    private downloadRepository: DownloadRepository
  ) { }

  // 카테고리 별 작품 리스트 가져오기 (+ 카테고리 명, 카테고리 설명)
  async findArtsByCategory(id: number): Promise<any> {

    const category = await this.categoryRepository.find({
      where: { id: id }
    })

    const categoryName = category[0].name;
    const categoryDescription = category[0].description;

    const artList = await this.artRepository.find({
      where: [
        { categoryId: id }
      ]
    });

    return [categoryName, categoryDescription, artList];
  }

  // 작가 별 작품 리스트 가져오기 (+ 작가 프로필)
  async findArtsByArtist(id: number): Promise<any> {
    const artist = await this.artistRepository.find({
      where: { id: id }
    })

    const artList = await this.artRepository.find({
      where: [
        { artistId: id }
      ]
    });

    return [artist, artList];
  }

  // 작가 별 작품 리스트 가져오기 (+ 작가 프로필)
  async findArtsByArtist2(id: number): Promise<Art[]> {
    return await this.artRepository.find({
      where: [
        { artistId: id }
      ]
    });
  }


  // 아이디로 작품 가져오기
  async getArtById(id: number): Promise<any> {

    this.artRepository.viewCount(id); // 개별 작품 조회시 마다 조회수 1 증가


    let found: any = await this.artRepository.findOne(id);

    const artistId = found.artistId;
    const artist = this.artistRepository.findOne(artistId);

    const artistName = (await artist).name;

    if (!found) {
      throw new NotFoundException(`Cant't find art with id ${id}`);
    }


    found.artistName = artistName; // 작가 이름 포함해서 가져오기
    return found;
  }

  // 작품 다운로드
  // 누가 어떤 작품을 다운로드 한 지 다운로드 테이블에 저장
  async downloadArt(id: number, addressId: string): Promise<any> {

    this.artRepository.viewCount(id); // 개별 작품 조회시 마다 조회수 1 증가

    const art = await this.artRepository.findOne(id); // 작품
    const user = await this.userRepository.findOne({ // 다운로드 한 사용자
      where: {
        addressId: addressId
      }
    });

    return this.downloadRepository.saveDownload(user, art);
  }

  // 작품 상세 조회 (작품 내용 + 작가 프로필 + 작가의 작품)
  async getArtDetail(id: number): Promise<any> {

    this.artRepository.viewCount(id); // 개별 작품 조회시 마다 조회수 1 증가

    const art = await this.artRepository.findOne(id); // 작품

    if (!art) {
      throw new NotFoundException(`Cant't find art with id ${id}`);
    }


    const artist = await this.artistRepository.findOne(art.artistId); // 작가

    let artistsArts = await this.artRepository.find({ // 작가의 전체 작품
      where: [
        { artistId: art.artistId }
      ]
    });

    let filteredArts = artistsArts.filter((element) => element.id != id); // 현재 작품 제외한 작품들

    return [art, artist, filteredArts];
  }
}